import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { endWith } from 'rxjs';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: any;
  loginData: any;
  otp: any;
  cardData: any;

  constructor(
    private rest: RestService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    // Obtain the Login array fom db.json using service and store it in this.loginData
    this.rest.getLogin().subscribe((data: any) => {
      this.loginData = data;
    });

    // Create the form elements with following validations
    // phone: Required, Should be a 10 digit number starts with 6,7,8 or 9
    // card : Required, should be a 4 digit number
    // otp : Required, shouldbea random number from 100 to 99999
    this.loginForm = new FormGroup({
      phone: new FormControl('',
        [
          Validators.required,
          Validators.pattern(/^([6,7,8,9])\d{9}$/)
        ]
      ),
      card: new FormControl('',
        [
          Validators.required,
          Validators.pattern(/^\d{4}$/)
        ]
      ),
      otp: new FormControl('',
        [
          Validators.required,
          Validators.pattern(/^[1-9]\d{4,4}$/)
        ]
      )
    });


  }

  next() {
    // Call this function when button "Next" is clicked
    // Used to validate credentials and generate otp
    // If the credentials are present in array generate the otp and show the otp field hiding other form elements
    if (!this.loginForm.get('card').valid || !this.loginForm.get('phone').valid) {
      return;
    }

    let card = this.loginForm.get('card').value;
    let phone = this.loginForm.get('phone').value;

    let found = this.loginData.find((element: any) => element.card.endsWith(card) && element.phone == phone);

    if (!!found) {
      // Generate an otp from 100 to 99999 and store it in this.otp
      this.otp = Math.floor(100 + Math.random() * 90000);
      // Also obtain the card data of the user from the Cards array using appropriate service
      this.rest.getCard(found?.card).subscribe(card => {
        this.cardData = card;
      })
      alert('The OTP is :'+this.otp)

    } else {
      // If the credential are not present show an alert message ""Invalid Credentials""
      this.otp = undefined;
      alert("Invalid Credentials");
    }
  }

  login() {
    // Calls this function when "Login" button is clicked
    // take the carddata of the usera and check if the user has a loan or not (check "loan_status" in Cards)
    // If loan_status is true navigate to "Profile Component" else navigate to "Loans Component"
    if(this.otp != this.loginForm.get('otp').value) {
      alert("Wrong OTP !");
      this.otp = undefined;
      return;
    }

    this.rest.setMsg(String(this.cardData.id));
    if(this.cardData.loan_status) {
      this.router.navigate(['Profile']);
    }else {
      this.router.navigate(['Loans']);
    }
    // Also pass the card id to the specific component

    // If the otp is false show an alert "Wrong OTP !" the hide the OTP field and show phone number and card
  }
}
