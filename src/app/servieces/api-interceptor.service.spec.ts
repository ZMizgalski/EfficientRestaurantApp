import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EndpointService } from './endpoint.service';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ApiInterceptorService } from './api-interceptor.service';

describe('ApiInterceptorService', () => {
  let endpointService: EndpointService;
  let service: ApiInterceptorService;
  let httpclient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
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
    endpointService = TestBed.inject(EndpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
