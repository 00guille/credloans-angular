import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestService } from '../../services/rest.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  loanData: any;
  loanForm: any;
  showLoan = true;
  isSimulating = false;
  cardId: any;
  cardData: any;

  constructor(
    private rest: RestService,
  ) { }

  ngOnInit(): void {
    // Obtain the loan id/card id from the previous component and get the user's credit limit and loan details using appropiate services
    // Store the loan details in this. loanData
    this.cardId = this.rest.getMsg() || 4027106782381002;
    this.init();

    this.loanForm = new FormGroup({
      amount: new FormControl(null, [Validators.required]),
    });
  }

  init() {
    const loan = this.rest.getLoan(this.cardId);
    const card = this.rest.getCard(this.cardId);
    forkJoin([loan, card])
      .subscribe((data: any) => {
        this.loanData = data[0];
        this.cardData = data[1];
        console.log('this.loanData', this.loanData)
        console.log('this.cardData', this.cardData)
      });
  }

  get yyy() {
    return this.cardData.credit_limit - this.loanData.finalAmount
  }

  get disableViewBtn() {
    return this.loanForm.invalid || (this.loanForm.get('amount').value > this.yyy)
  }

  upgrade() {
    // Hide the table and show the form to upgrade the loan
    this.showLoan = false;

  }

  view() {
    // obtain new amount from the form and calculate:
    const newAmount = this.loanData.principal + +this.loanForm.get('amount').value;
    console.log({ newAmount })
    // new final amount = old final amoun + ( new amount + (new amount *6) * (duration in years))
    const newFinalAmount = newAmount + (newAmount * 0.06 * (this.loanData.duration / 12));
    console.log({ newFinalAmount })

    // emi = final amount / duration in months (round off using ceiling function)
    const newEmi = Math.ceil(newFinalAmount / (this.loanData.duration));
    // display this data in appropiate positions in the loan table and hide the form
    console.log('this.loanData', this.loanData)
    this.loanData = {
      ...this.loanData,
      principal: newAmount,
      finalAmount: newFinalAmount,
      emi: newEmi
    }
    console.log('this.loanData', this.loanData)
    // also hide the Upgade button in the table and dispaly "Close" and "Proceed" button
    this.showLoan = true;
    this.isSimulating = true;

  }

  cancel() {
    // reset the form and show the intial data displayed
    this.init();
    this.isSimulating = false;
  }

  proceed() {
    // Use the appropiate service and update the Loan data of the user

    // principal amount, final amount and emi should be updated

    // and give an alert message "Loan updated !"
    this.rest.updateLoan(this.loanData).subscribe(data => {
      console.log(data)
      alert('Loan updated !')
    })
  }
}
