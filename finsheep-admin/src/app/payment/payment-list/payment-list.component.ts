import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonService } from 'src/service/common.service';

declare var Square: any;
@Component({
  selector: 'app-payment-list',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule,  HttpClientModule],
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {
  payments: any;
  card: any;
  constructor(private http: HttpClient, private common: CommonService) {}

  ngOnInit(): void {
    this.initializeSquarePayments();
  }

  async initializeSquarePayments() {
    const appId = 'sandbox-sq0idb-SH2ggZPf5KG-3cRx0mK0-A'; // Replace with your actual Application ID
    const locationId = 'LF45MA5ZPCCVM'; // Replace with your actual Location ID

    const payments = Square.payments(appId, locationId);
    this.card = await payments.card();
    await this.card.attach('#card-container');
  }

  async handlePayment() {
    try {
      const result = await this.card.tokenize();
      if (result.status === 'OK') {
        const sourceId = result.token;
        console.log('Tokenized sourceId:', sourceId);
        this.sendToBackend(sourceId);
      } else {
        console.error('Tokenization failed:', result.errors);
      }
    } catch (error) {
      console.error('Error during tokenization:', error);
    }
  }

  async sendToBackend(sourceId: string) {
    const payload = {
      sourceId: sourceId,
      amountMoney: {
        amount: 10000,  // Dynamic amount in cents
        currency: "USD",  // Dynamic currency
      },
    };
    
    console.log('Sending to backend:', payload);  // Log the request payload before sending
    
    let response = await this.common.NewPayment(payload)
    if(response && response.status == 200){
      console.log("Successss");
    }
    else console.log("error");
    
  }
}


