import { RestService } from './rest.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CardsData, LoansData, LoginData } from 'src/dbData';


fdescribe('RestService', () => {
  let rs: RestService;
  let httpTestingController: HttpTestingController
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        RestService
      ]

    });

    rs = TestBed.get(RestService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('Should retrieve Login data', () => {
    rs.getLogin().subscribe(response => {

      expect(response).toBeTruthy()
      expect(response).toEqual(LoginData)
    })

    const req = httpTestingController.expectOne('localhost/Login');
    req.flush(LoginData);

  });

  it('Should retrieve Loan data', () => {
    rs.getLoan(4027106782381001).subscribe(response => {

      expect(response).toBeTruthy();
      expect(response).toEqual(LoansData[0])
    });

    const req = httpTestingController.expectOne('localhost/Loans/4027106782381001');
    req.flush(LoansData[0]);

  });

  it('Should retrieve Card data', () => {
    rs.getCard(4027106782381002).subscribe(response => {

      expect(response).toBeTruthy();
      expect(response).toEqual(CardsData[1])
    });

    const req = httpTestingController.expectOne('localhost/Cards/4027106782381002');
    req.flush(CardsData[1]);

  });


  it('Should update a record in Cards array', () => {
    rs.updateCards(CardsData[0]).subscribe(data => {
      expect(data).toEqual(CardsData[0])
    });
    const req = httpTestingController.expectOne('localhost/Cards/4027106782381001');
    expect(req.request.method).toBe("PUT");
    expect(req.request.body).toEqual(CardsData[0]);
    req.flush(CardsData[0]);
  });

  it('Should update a record in Loans array', () => {
    rs.updateLoan(LoansData[0]).subscribe(data => {
      expect(data).toEqual(LoansData[0])
    });
    const req = httpTestingController.expectOne('localhost/Loans/4027106782381001');
    expect(req.request.method).toBe("PUT");
    expect(req.request.body).toEqual(LoansData[0]);
    req.flush(LoansData[0]);
  });

  it('setMsg() and getMsg()', () => {

    expect(rs.msg).toBeUndefined();

    rs.setMsg(1);
    expect(rs.msg).toEqual(1);
    expect(rs.getMsg()).toBe(1);

  })






});
