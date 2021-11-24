import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
// import _ from 'loadash';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  users = [];
  loggedInUser: any;

  constructor(private usersService: UsersService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.loggedInUser = this.tokenService.GetPayload()
    this.GetAllUsers();
  }

  GetAllUsers() {
    this.usersService.GetAllUsers().subscribe(data => {
      this.users = data.result;
      // this.users = this.RemoveItem(data.result, this.loggedInUser);
    });
  }

  RemoveItem<T>(arr: Array<T>, value: T): Array<T> { 
  const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}


}
