export const  AppConstants={
    baseUrl:`http://localhost:3000/api`,   

    //users
    getAllUserList:`/user/all`,
    getUserDetails:`/user/`,
    addUpdateUser:`/user/upsert`,
   // dropdownList:`/user/list/dropdown`,
    deleteUser:`/user/`,
    login:`/user/admin-login`,

    //blog
    blogList:`/blog/`,
    blogDetails:`/blog/`,
    upsertBlog:`/blog/upsert`,
    deleteBlog:`/blog/`,


    //Stock
    bulkUpload: `/stock/bulkUpload`,
    
    //category
    categoryList:`/category/`,
    categoryDetails:`/category/`,
    upsertCategory:`/category/upsert`,
    deleteCategory:`/category/`,
    categoryDropdown:`/category/dropdown/list`,

    //products
    productList:`/product`,
    productDetails:`/product/`,
    upsertProduct:`/product/upsert`,
    deleteProduct:`/product/`,
    addProductImage:`/product/image/`,
    deleteProductImage:`/product/image/`,
    productDropdown:`/product/dropdown/list`,

   //product variation
   deleteVariation:`/variation/`,

    //orders
    newOrder:`/order/new/`,
    getAllOrders:`/order/all`,
    getUserOrder:`/order/my/`,
    cancelOrder:`/order/cancel/`,

    //payment
    newPayment:`/payment/new/`,
    verifyPayment:`/payment/verify/`,

}


export interface EventForm{
    eventName:String,
    userName:String,
    userCity:String,
    userMobile:String,
    userEmail:String,
    userCollege:String,
    pursueMba:string,
    budget:String,
    eventSource:String,
    eventCity:String,
}
export interface AddressObject{
    address:string,
    state:string,
    city:string,
    zipCode:string
    mobile:string
}

export enum UserRole{
    Admin=0,
    SuperAdmin=1,
    Client=2,
  }

export enum ProductCut{
    ribs="ribs",
    shanks="shanks",
    loin = "loin",
    shoulder="shoulder",
    rack="rack",
    ground="ground",
    boneless="boneless",
    stewMeat = "stewMeat"
}
  