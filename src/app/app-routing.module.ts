import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImagesGridComponent } from './images-grid/images-grid.component';
import { ReviewImageComponent } from './review-image/review-image.component';

const routes: Routes = [
  {path:'',component:ImagesGridComponent},
  {path:'review',component:ReviewImageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
