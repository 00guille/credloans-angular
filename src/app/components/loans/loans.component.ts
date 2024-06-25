import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss']
})
export class LoansComponent implements OnInit {
  card: any;
  cardData: any;
  loanForm: any;
  duration!: number;
  amount: any;
  finalAmount!: number;
  emi!: number;
  loan!: any;

  constructor(
    private rest: RestService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Obtain card id from login component and store it in this.card
    this.card = 4027106782381003 || this.rest.getMsg();

    // get the respective card data from Cards array in db.json using services and use it appropriately in template
    this.rest.getCard(this.card)
      .subscribe((data: any) => {
        this.cardData = data;
        this.loanForm = new FormGroup({
          // Create the form elements with following validations
          // amount: Required, minimum = 10000, maximum = credit limit of the user
          // duration: Required
          amount: new FormControl('', [
            Validators.required,
            Validators.min(10000),
            Validators.max(this.cardData.credit_limit)
          ]),
          duration: new FormControl('', Validators.required)
        })
      });

  }

  view() {
    // obtain amount and duration from the form and calculate:
    // final amount = amount + (amount*6) * (duration in years)
    // emi = final amount / duration in months (round off using ceiling function)
    // display this data in appropriate positions in the loan table and hide the form
    const amount = +this.loanForm.get('amount').value;
    const duration = +this.loanForm.get('duration').value;

    const finalAmount = amount + ((amount * 6) * (duration / 12)) / 100;
    const emi = Math.ceil(finalAmount / duration);
    this.loan = {
      amount,
      principal: amount,
      duration,
      finalAmount,
      emi
    };

  }

  proceed() {
    // data = {
    //   "id": card id
    //   "name": name of the card owner
    //   "principal": loan amount taken
    //   "finalAmount": amount to be repaid with interest
    //   "duration": duration of the loan
    //   "emi": monthly emi
    // }
    const { principal, duration, finalAmount, emi } = this.loan;
    const data = {
      id: this.card,
      name: this.cardData.name,
      principal,
      finalAmount,
      duration,
      emi,
    }

    // Create the above loan data object and add it to the Loans array in db.json using the appropiate serv...
    this.rest.addLoan(data)
      .subscribe(data => {
        console.log('data', data)
        const body = {...this.cardData, id: this.card, loan_status: true}
        this.rest.updateCards(body).subscribe(data => {
          console.log('data', data)
          alert('Loan approved !');
          this.router.navigate(['/Profile']);
        })
      })

    // use the proper service and update the card ddata of the user by setting loan_status = true

    // Show an alert message "Loan approved", pass the card id to the Profile component and navigate there
  }

  close() {
    // Hide the table and display form
    this.loan.amount = undefined;
  }
}
