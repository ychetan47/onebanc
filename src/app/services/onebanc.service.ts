import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from '../Models/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class OnebancService {
  private apiUrl = 'http://dev.onebanc.ai/assignment.asmx';
  constructor(private http : HttpClient) { }

  getTransactionHistory(userId, recipientId){
    var params = new HttpParams()
    .set('userId', userId)
    .set('recipientId', recipientId);

    return this.http.get<ResponseModel>(this.apiUrl+'/GetTransactionHistory', {params: params});
  }

  getTransactionSummary(userId, transactionId){
    var params = new HttpParams()
    .set('userId', userId)
    .set('transactionId', transactionId);

    return this.http.get(this.apiUrl+'/GetTransactionSummary', { params: params });
  }
}
