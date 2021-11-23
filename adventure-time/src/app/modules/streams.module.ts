import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamsComponent } from '../components/streams/streams.component';
import { TokenService } from '../services/token.service';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { SideComponent } from '../components/side/side.component';
import { GameFormComponent } from '../components/game-form/game-form.component';
import { GamesComponent } from '../components/games/games.component';
import { GamesService } from '../services/games.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    StreamsComponent,
    ToolbarComponent,
    SideComponent,
    GameFormComponent,
    GamesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    StreamsComponent,
    ToolbarComponent
  ],
  providers: [
    TokenService,
    GamesService,
  ]
})
export class StreamsModule { }
