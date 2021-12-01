import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  reciever!: string;
  user: any;
  message!: String; // we added an ngModel in the html (textArea) so we can get the string here
  recieverData: any;

  constructor(
    private tokenService: TokenService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.user = this.tokenService.GetPayload();
    this.route.params.subscribe(params => {
      this.reciever = params.nickname;
      this.GetUserByNickname(this.reciever);
    })
  }

  GetUserByNickname(name:any) {
    this.usersService.GetUserByNickname(name).subscribe(data => {
      this.recieverData = data.result;
    })
  }

  SendMessage() {
    this.messageService
      .SendMessage(this.user._id, this.recieverData._id, this.recieverData.nickname, this.message)
      .subscribe(data => {
        console.log(data)
      })
  }
}
