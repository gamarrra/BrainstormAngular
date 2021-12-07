import { Component, OnInit, OnDestroy } from '@angular/core';
import { EnviaMailServicesService } from 'src/Services/envia-mail-services';
import { Subscription } from 'rxjs';
import {FormGroup, FormControl, FormBuilder, Validators, FormArray} from '@angular/forms';


@Component({
  selector: 'app-envia-mail',
  templateUrl: './envia-mail.component.html',
  styleUrls: ['./envia-mail.component.css']
})
export class EnviaMailComponent implements OnInit {
  public subscription: Subscription ;

  constructor(private sendmailservice: EnviaMailServicesService,
    private fb: FormBuilder) { }
  ngOnInit(): void {
  }

  infoForm = this.fb.group({
    name: ['', [
      Validators.required,
      Validators.minLength(3)
    ]
    ],
    email: ['', [
      Validators.required,
      Validators.email
    ]
    ],
    emailCC: ['', [
      Validators.required,
      Validators.email
    ]
    ],
    motivo: ['', [
      Validators.required,
      Validators.minLength(3)
    ]
    ],
  });

  get name() { return this.infoForm.get('name'); }
  get email() { return this.infoForm.get('email'); }
  get emailCC() { return this.infoForm.get('emailCC'); }
  get motivo() { return this.infoForm.get('motivo'); }


  sendMail() {
    console.log(this.infoForm.value);
    this.subscription = this.sendmailservice.sendEmail(this.infoForm.value).
    subscribe(data => {
      let msg = data['message']
      alert(msg);
      // console.log(data, "success");
    }, error => {
      console.error(error, "error");
    } );
  }


  ngOnDestroy() {
  }


}
