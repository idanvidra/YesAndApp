import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router'
import { StreamsComponent } from '../components/streams/streams.component';
import { PeopleComponent } from '../components/people/people.component';
import { AuthGuard } from '../services/auth.guard';


const routes: Routes = [
  {
    path: 'streams',
    component: StreamsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'people',
    component: PeopleComponent,
    canActivate: [AuthGuard]
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
