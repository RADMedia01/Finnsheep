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
    Expired=5,
    PaymentFailed=6
}

export enum PaymentStatus{
    Pending=0,
    Processing=1,
    Success=2,
    Authorized=3,
    Expired=4,
    Failed=5,
    COD=6
}

export enum TransactionStatus{
    Initiated=0,
    Success=1,
    Failed=2
}

export enum StockStatus{
    inStock=0,
    outOfStock=1
}

export const BoxInfoList:IBoxItem[]=[{
    type:"Small",
    length:5,
    width:5,
    height:5,
    price:5,
    volume:125
},
{
    type:"Medium",
    length:8,
    width:8,
    height:8,
    price:5,
    volume:512
},
{
    type:"Large",
    length:10,
    width:10,
    height:10,
    price:5,
    volume:1000,
}]


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


//------------------ box section --------------------------------


export interface IBoxItem{
    type:string,
    length:number,
    width:number,
    height:number,
    price:number,
    weight?:number,
    volume:number
}
