import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LoansComponent } from './loans.component';
import { Observable, of } from 'rxjs';
import { CardsData, LoginData } from 'src/dbData';
import { RestService } from 'src/app/services/rest.service';
import { Router } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { routes } from '../../app-routing.module'

export class MockRestService {
  Msg: any;
  getLogin(): Observable<any> {
    return of(LoginData);
  }

  getCard(id: any) {
    return of(CardsData[2])
  }

  setMsg(data: any) {
    this.Msg = data
  }

  getMsg(data: any) {
    return of(4027106782381003)
  }

  addLoan(data: any) {
    return of(null)
  }

  updateCards(data: any) {
    return of(null)
  }
}

describe('LoansComponent', () => {
  let component: LoansComponent;
  let fixture: ComponentFixture<LoansComponent>;
  let rs: RestService;
  let location: Location;
  let router: Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LoansComponent,
        ProfileComponent
      ],

      providers: [
        {
          provide: RestService, useClass: MockRestService
        },
        HttpClient,
        HttpHandler,
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule
      ]
    })
      .compileComponents();

    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(LoansComponent);
    router.initialNavigation();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(LoansComponent);
    rs = TestBed.inject(RestService)
    component = fixture.componentInstance;
    fixture.detectChanges()
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Initial rendering (welcome msg, form visible, table hidden)', () => {
    let title: HTMLElement = fixture.nativeElement.querySelector('h2');
    expect(title.innerHTML).toBe('Hi Arya Stark, You are eligible for a loan upto 50000 Rs.');

    let form: HTMLElement = fixture.nativeElement.querySelector('form');
    expect(form.hidden).toBeFalse();

    let table: HTMLElement = fixture.nativeElement.querySelector("table");
    expect(table).toBeNull()
  });

  it('Form validation check (duration) ', fakeAsync (() => {
    let control = component.loanForm.get('amount');

    control.setValue('');
    expect(control.valid).toBeFalsy();
    
    control.setValue(12000);
    expect(control.valid).toBeTruthy();
  }));

  it('Button disable/enable check', fakeAsync(() => {
    let amount = component.loanForm.get('amount');
    let duration = component.loanForm.get('duration');

    fixture.detectChanges()
    tick();
    let button: HTMLButtonElement = fixture.nativeElement.querySelector('.btn');
    fixture.detectChanges();
    expect(button.disabled).toBeTrue();

    amount.setValue(1001);
    duration.setValue(12);
    fixture.detectChanges();
    tick();
    expect(button.disabled).toBeTrue();

    amount.setValue(12000);
    duration.setValue("12");
    fixture.detectChanges();
    tick();
    expect(button.disabled).toBeFalse();

    amount.setValue(120000);
    duration.setValue(12);
    fixture.detectChanges();
    tick();
    expect(button.disabled).toBeTrue();
  }));

  it('Checking view() ', fakeAsync(() => {
    let amount = component.loanForm.get('amount');
    let duration = component.loanForm.get('duration');

    fixture.detectChanges();
    tick();
    let button: HTMLButtonElement = fixture.nativeElement.querySelector('.btn');

    amount.setValue(20000);
    duration.setValue(12);
    fixture.detectChanges();
    tick();
    button.click();
    fixture.detectChanges();
    tick();

    let form = fixture.nativeElement.querySelector('form');
    expect(form).toBeNull();

    let table: HTMLElement = fixture.nativeElement.querySelector('table > tr:nth-child(2)');
    expect(table.innerText).toContain("20000 Rs")
    table = fixture.nativeElement.querySelector('table > tr:nth-child(4)');
    expect(table.innerText).toContain("21200 Rs")
    table = fixture.nativeElement.querySelector('table > tr:nth-child(6)');
    expect(table.innerText).toContain("1767 Rs")

    let closeButton = fixture.nativeElement.querySelector("table > tr:nth-child(7) > td > button");
    component.close();
    fixture.detectChanges();
    table = fixture.nativeElement.querySelector("table");
    expect(table).toBeNull();
    
  }))

  it('Checking view() input 2 ', fakeAsync(() => {
    // TODO: seguir aqui loans.components.spec.ts05.jpg
  }))
});
