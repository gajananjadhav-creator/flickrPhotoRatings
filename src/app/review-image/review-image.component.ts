import { Component, OnInit,ViewChild } from '@angular/core'; 
import { from, Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FlickrAPIService} from '../services/flickr-api.service';
import { FlickrPhoto } from '../Interface/FlickrImages';
import { ImagesGridComponent } from '../images-grid/images-grid.component';

@Component({
  selector: 'app-review-image',
  templateUrl: './review-image.component.html',
  styleUrls: ['./review-image.component.css']
})
export class ReviewImageComponent implements OnInit {
  
  @ViewChild('f') signupForm:NgForm;
  imageDetail;
  rating;
  stars=[1,2,3,4,5];

  constructor(private router:Router,
              private flickrService:FlickrAPIService,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(){
    this.flickrService.getImageById().subscribe(data=>{
            this.imageDetail=data;        
                          
        });
        
  }
    
  
  onSubmit(){    
    let data:any=this.signupForm.value;
   this.router.navigate(['/'],{
     queryParams:{rating:this.rating,imageId:this.imageDetail.id}
   });
  }
}
