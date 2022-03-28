import { Component, OnInit } from '@angular/core';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  isLogged = false;
  nombreUser = '';

  constructor(private tokenService: TokenService) { }

  ngOnInit() {
    if(this.tokenService.getToken()) {
      this.isLogged = true;
      this.nombreUser = this.tokenService.getUserName();
    } else {
      this.isLogged = false;
      this.nombreUser = '';
    }
  }

}
