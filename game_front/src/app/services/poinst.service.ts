import { BehaviorSubject } from 'rxjs';
import { Http, Response, Headers } from '@angular/http';
import { HttpClientModule, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Component, OnInit, OnDestroy, Injectable } from '@angular/core';
import { AppUrlSettings } from './AppUrlSettings';
import { DataSource } from '@angular/cdk/collections';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { RelativeStrengthIndex } from '@amcharts/amcharts5/.internal/charts/stock/indicators/RelativeStrengthIndex';
@Injectable({
  providedIn: 'root'
})
export class pointService {
  public to: any;
  constructor(private http: HttpClient) { }
  getAllGame(): Observable<any> {
    return this.http.get<any>(AppUrlSettings.BASE_API + AppUrlSettings.GET_ALL_GAME);
  }

 putGame(data:any): Observable<any> {
    return this.http.post<any>(AppUrlSettings.BASE_API + AppUrlSettings.PUT_GAME,data);
  }
  deleteGame(id:any): Observable<any> {
    return this.http.delete<any>(AppUrlSettings.BASE_API + AppUrlSettings.DELETE_GAME+id);
  }
  editGame(data:any): Observable<any> {
    return this.http.post<any>(AppUrlSettings.BASE_API + AppUrlSettings.EDIT_GAME,data);
  }
  getByidGame(id:any): Observable<any> {
    return this.http.get<any>(AppUrlSettings.BASE_API + AppUrlSettings.GETBYID_GAME+id);
  }

 
}
