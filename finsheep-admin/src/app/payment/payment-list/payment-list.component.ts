import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var Square: any;
@Component({
  selector: 'app-payment-list',
  standalone: true,
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {
  payments: any;
  card: any;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.initializeSquarePayments();
  }

  async initializeSquarePayments() {
    const appId = 'sandbox-sq0idb-SH2ggZPf5KG-3cRx0mK0-A'; // Replace with your actual Application ID
    const locationId = 'your-location-id'; // Replace with your actual Location ID

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

  sendToBackend(sourceId: string) {
    this.http.post('http://localhost:3000/api/payment/new', {
      sourceId: sourceId,
      amount: 100, // Example amount in cents
    }).subscribe(
      (response: any) => {
        if (response.success) {
          alert('Payment successful!');
        } else {
          alert('Payment failed!');
        }
      },
      (error) => console.error('Error processing payment:', error)
    );
  }
}


