import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-signup',
  templateUrl: './event-signup.component.html',
  styleUrls: ['./event-signup.component.css']
})
export class EventSignupComponent implements OnInit {

  signupMail: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('Form gesendet')
  }

}
