export const  AppConstants={
    baseUrl:`http://localhost:2000/api`,   

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

    //item-size
    itemSizeList:`/size/`,
    itemSizeDetails:`/size/`,
    upsertItemSize:`/size/upsert`,
    deleteItemSize:`/size/`,

    //orders
    newOrder:`/order/new/`,
    getAllOrders:`/order/all`,
    getUserOrder:`/order/my/`,
    cancelOrder:`/order/cancel/`,

    //payment
    newPayment:`/payment/new/`,
    verifyPayment:`/payment/verify/`
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
  