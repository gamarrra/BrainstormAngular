import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public profileJson: string = "";
  public profileInfo: any;
  constructor(public auth: AuthService) {
  }

  ngOnInit(): void {
    this.auth.user$
      .subscribe((profile) => {
        console.log(profile);
        this.profileInfo = profile;
        this.profileJson = JSON.stringify(profile, null, 2)
      });
  }
}
