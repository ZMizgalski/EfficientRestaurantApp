import {
  HttpRequest,
  HTTP_INTERCEPTORS,
  HttpClient,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { ApiInterceptorService } from './api-interceptor.service';

describe('ApiInterceptorService', () => {
  let service: ApiInterceptorService;
  let httpclient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: service,
          multi: true,
          useValue: {},
        },
      ],
    });
    service = TestBed.inject(ApiInterceptorService);
    httpMock = TestBed.inject(HttpTestingController);
    httpclient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add api-x to header', () => {
    const next: any = {
      handle: () => {
        return new Observable((subscriber: { complete: () => void }) => {
          subscriber.complete();
        });
      },
    };
    const requestMock = new HttpRequest('GET', '/test');
    service.intercept(requestMock, next).subscribe(() => {
      const testRequestMock = requestMock.clone({
        setHeaders: {
          'X-API-KEY': 'HoA',
        },
      });
      expect(requestMock).toEqual(testRequestMock);
    });
  });
});
