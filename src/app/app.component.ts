import { OnebancService } from './services/onebanc.service';
import { Component, OnInit } from '@angular/core';
import { ResponseModel, Transaction, Partner } from './Models/ResponseModel';
import * as Enums from './Models/enums';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private userId : number = 1;
  Enums = Enums;
  transactionsModel: Array<TransactionsModel>;
  modalData : Transaction;
  
  constructor(private oneBancService: OnebancService,
    private modalService : NgbModal){
    this.transactionsModel = new Array<TransactionsModel>();
    this.modalData = new Transaction();
  }

  ngOnInit(){
    this.oneBancService.getTransactionHistory(this.userId, 2).subscribe(data => {
      this.groupTransactions(data.transactions.slice());
      this.sortTransactions();
    });
  }

  //group transactions acc to dates
  groupTransactions(transactions : Transaction[]){
    let set = new Set<string>();

    transactions.forEach(t => {

      let iteratedDate = new Date(t.startDate);
      iteratedDate.setHours(0,0,0,0);

      if(!set.has(iteratedDate.toString())){
        set.add(iteratedDate.toString());

        let newTransaction = new Array<Transaction>();
        newTransaction.push(t);

        this.transactionsModel.push(new TransactionsModel({
          transDate: iteratedDate.toString(),
          transactions: newTransaction,
        }));

      }else{
        this.transactionsModel.find(tm => tm.transDate == iteratedDate.toString())
        .transactions.push(t);
      }
    });
  }

  sortTransactions(){
    this.transactionsModel.forEach(
      t => t.transactions.sort((a,b) => 
      (a.startDate == b.startDate) ? 0 : (a.startDate > b.startDate) ? 1 : -1)
    )
  }

  openSummary(content, transaction){
    this.modalData = transaction;
    this.modalService.open(content);
  }

  closeSummary(){
    this.modalService.dismissAll();
  }

  pay(transaction: Transaction){
    transaction.status = Enums.Status.Confirmed;
    transaction.endDate = new Date();
  }

  cancel(transaction: Transaction){
    transaction.status = transaction.direction == Enums.Direction.Received ? Enums.Status.Reject : Enums.Status.Cancel;
    transaction.endDate = new Date();
  }
}

class TransactionsModel{
  transDate: string;
  transactions: Array<Transaction>;
  constructor(args?){
    this.transDate = args['transDate'];
    this.transactions = args['transactions'];
  }
}
