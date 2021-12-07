import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.css']
})
export class UserviewComponent implements OnInit {
  user:any;
  constructor() { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('usuarioauth0'));
    console.log('usuarioview',this.user.given_name)
    
  }



}
