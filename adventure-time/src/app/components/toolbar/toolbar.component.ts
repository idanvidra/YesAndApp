import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  user: any;
  constructor(private router: Router, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.user = this.tokenService.GetPayload();
  }

  logout(){
    this.tokenService.DeleteToken();
    this.router.navigate(['/']);
  }

}
