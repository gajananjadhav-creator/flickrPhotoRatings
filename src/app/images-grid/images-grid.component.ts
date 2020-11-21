import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FlickrAPIService } from '../services/flickr-api.service';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';

 
@Component({
  selector: 'app-images-grid',
  templateUrl: './images-grid.component.html',
  styleUrls: ['./images-grid.component.css']
})
export class ImagesGridComponent implements OnInit {

  imageRating:any;
  imgId:any;
  images=[];
  loadImageId:any;

  constructor(private activatedRoute:ActivatedRoute, 
              private flickrService:FlickrAPIService){}


  ngOnInit(){
    
    this.flickrService.loadFoodImages()
    .subscribe((res)=>{
      this.images=res;      
    });


    //Get image ratings and imageId from routing params
    this.activatedRoute.queryParams.subscribe(params=>{
          this.imageRating=params.rating;
          this.imgId=params.imageId;
       });

       
   
  }

  sendImageDetail(id:string){
      this.flickrService.setImageById(id);
 }
 
}