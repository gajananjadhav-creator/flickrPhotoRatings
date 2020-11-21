import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { map, toArray, filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { from, BehaviorSubject, Observable } from 'rxjs';

import { FlickrPhoto } from '../Interface/FlickrImages'; 
import { stringify } from '@angular/compiler/src/util';
import { ActivatedRoute } from '@angular/router';


// export interface FlickrOutput{
  
// }

@Injectable({
  providedIn: 'root'
})
export class FlickrAPIService implements OnInit{
    private url='https://www.flickr.com/services/rest/?method=flickr.photos.search&';
    private params=`api_key=${environment.flickr.key}&text=food&format=json&nojsoncallback=1&per_page=30`;
    public urlArr=[];
    public imageArr=[];
    imageRating:any;
    imgId:any;

    private availableImages=new BehaviorSubject<any[]>([]);
  
  constructor(private http:HttpClient,private activatedRoute:ActivatedRoute) {
    this.urlArr = [];
   }

  ngOnInit(){

    this.activatedRoute.queryParams.subscribe(params=>{
      this.imageRating=params.rating;
      this.imgId=params.imageId;
    })
  }

  loadFoodImages(){
    
    return this.http.get(this.url+this.params).pipe(map((res:FlickrPhoto)=>{
      
      if(this.urlArr.length==0){  
        res.photos.photo.forEach((ph:FlickrPhoto)=>{
          const photoObj={
            url:`https://live.staticflickr.com/${ph.server}/${ph.id}_${ph.secret}.jpg`,
            title:ph.title,
            id:ph.id,
            farm:ph.server,
            secret:ph.secret,
            rating:''
          };
          this.urlArr.push(photoObj);
        });
        return this.urlArr;
      }
      else {
        return this.urlArr;

      }
    }));
  }

  setImageById(id:string){
      
    const source=from(this.urlArr);
      source.pipe(
          filter(imageData=>imageData.id==id),
        ).subscribe(res=>{      
           this.availableImages.next(res);
        })
    }

  getImageById(){    
    return this.availableImages.asObservable();
}

  
}
