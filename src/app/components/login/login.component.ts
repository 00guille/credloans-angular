import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

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

  constructor() {

  }

  ngOnInit(): void {
    // Obtain the Login array fom db.json using service and store it in this.loginData

    this.loginForm = new FormGroup({
      // Create the form elements with following validations
        // phone: Required, Should be a 10 digit number starts with 6,7,8 or 9
        // card : Required, should be a 4 digit number
        // otp : Required, shouldbea random number from 100 to 99999

    });

  }

  next() {
    // Call this function when button "Next" is clicked
    // Used to validate credentials and generate otp

    // If the credentials are present in array generate the otp and show the otp field hiding other form elements
    // Generate an otp from 100 to 99999 and store it in this.otp
    // Also obtain the card data of the user from the Cards array using appropriate service

    // If the credential are not present show an alert message ""Invalid Credentials""
  }

  login() {
    // Calls this function when "Login" button is clicked
    // take the carddata of the usera and check if the user has a loan or not (check "loan_status" in Cards)
    // If loan_status is true navigate to "Profile Component" else navigate to "Loans Component"
    // Also pass the card id to the specific component

    // If the otp is false show an alert "Wrong OTP !" the hide the OTP field and show phone number and card
  }
}
