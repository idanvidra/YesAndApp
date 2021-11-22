import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {

  gameForm!: FormGroup;

  constructor(private fb: FormBuilder, private gameService: GamesService) { }

  ngOnInit(): void {
    this.init()
  }

  init() {
    this.gameForm = this.fb.group({
      game: ["", Validators.required]
    })

  }

  SubmitGame() {
    this.gameService.addGame(this.gameForm.value).subscribe(data => {
      console.log(data);
      this.gameForm.reset();
    })
  }

}
