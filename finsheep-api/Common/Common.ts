export enum UserRole{
    Admin=0,
    SuperAdmin=1,
    Client=2,
}



export enum OrderStatus{
    Pending=0,
    OrderReceived=1,
    Processing=2,
    Delivered=3,
    Cancelled=4,
    Expired=5
}

export enum PaymentStatus{
    Pending=0,
    Processing=1,
    Success=2,
    UnPaid=3,
    Expired=4,
    Failed=5
}

export enum TransactionStatus{
    Initiated=0,
    Success=1,
    Failed=2
}

export const rootDir = process.cwd();
export const baseUrl = `http://localhost:2000`;

export function EncodeBase64(input:string) {
    return btoa(input);
  }
export function DecodeBase64(input:string) {
    return atob(input);
  }

export const razorPayGatewayUrl="https://api.razorpay.com/v1/checkout/embedded?payment_id="

export const FilePaths = {
    productFilePath: `/uploads/products`,
};
