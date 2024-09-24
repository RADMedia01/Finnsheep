import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-payment-list',
  standalone: true,
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {
  paymentForm: any;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    this.loadSquareScript();
  }

  loadSquareScript() {
    console.log('Attempting to load Square script...');
    debugger
    if (!document.querySelector('script[src="https://sandbox.web.squarecdn.com/v1/square.js"]')) {
      const script = document.createElement('script');
      debugger
      script.src = 'https://sandbox.web.squarecdn.com/v1/square.js';
      script.onload = () => {
        console.log('Square script loaded successfully.');
        this.ngZone.run(() => {
          this.initPaymentForm();
        });
      };
      script.onerror = (error) => {
        console.error('Error loading Square script:', error);
      };
      document.body.appendChild(script);
    } else {
      console.log('Square script already present in the DOM.');
      this.initPaymentForm();
    }
  }

  initPaymentForm(retryCount = 0): void {
    debugger
    
    console.log('Initializing payment form...');
    if (typeof (window as any).Square === 'undefined') {
      console.warn('Square object is not defined. Retrying...');
      if (retryCount < 5) {
        setTimeout(() => this.initPaymentForm(retryCount + 1), 1000);
      } else {
        console.error('Failed to initialize Square payment form after 5 attempts.');
      }
      return;
    }

    try {
      const payments = (window as any).Square.payments('sandbox-sq0idb-SH2ggZPf5KG-3cRx0mK0-A', 'sandbox');
      payments.card().then((card: any) => {
        this.paymentForm = card;
        card.attach('#card-container');
        console.log('Square Payment form initialized successfully.');
      }).catch((error: any) => {
        console.error('Error initializing Square Payment form:', error);
      });
    } catch (error) {
      console.error('Error in Square Payment form initialization:', error);
    }
  }

  async requestCardNonce(event: Event): Promise<void> {
    debugger
    event.preventDefault();

    if (this.paymentForm) {
      try {
        debugger
        const result = await this.paymentForm.tokenize();
        if (result.status === 'OK') {
          console.log('Payment nonce:', result.token);
          this.processPayment(result.token);
        } else {
          console.error('Tokenization failed:', result.errors);
        }
      } catch (error) {
        console.error('Error in tokenization:', error);
      }
    } else {
      console.error('Payment form is not initialized yet.');
    }
  }

  processPayment(nonce: string): void {
    console.log('Nonce received:', nonce);
    // Implement your payment processing logic here
  }
}