import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-footer-nav',
  templateUrl: './footer-nav.component.html',
  styleUrls: ['./footer-nav.component.css']
})
export class FooterNavComponent implements OnInit {

  constructor(public _cookieService: CookieService,
              public _authService: AuthService) { }

  ngOnInit() {}

}
