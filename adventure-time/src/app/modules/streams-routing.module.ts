import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router'
import { StreamsComponent } from '../components/streams/streams.component';


const routes: Routes = [
  {
    path: 'streams',
    component: StreamsComponent
  }
]

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class StreamsRoutingModule { }
