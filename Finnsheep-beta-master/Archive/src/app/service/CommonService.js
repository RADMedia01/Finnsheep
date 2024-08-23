export const  AppConstants={
    baseUrl:`http://localhost:2000/api`,   

    //users
    getAllUserList:`/user/get/all`,
    getUserDetails:`/user/`,
    updateUser:`/user/update/`,
    addUser:`/user/register/`,
    dropdownList:`/user/list/dropdown`,
    deleteUser:`/user/remove/`,
    userLogin:`/user/login`,

    //blog
    blogList:`/blog/all`,
    blogDetails:`/blog/`,
    addBlog:`/blog/add`,
    updateBlog:`/blog/update/`,
    deleteBlog:`/blog/`,

    //category
    categoryList:`/category/`,
    categoryDetails:`/category/`,
    upsertCategory:`/category/upsert`,
    deleteCategory:`/category/`,
    categoryDropdown:`/category/dropdown`,

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



  //------------------------ category api -------------------->
 export const GetCategoryList=(pageNo,search)=>{
    return axios.get(`${AppConstants.baseUrl}${AppConstants.categoryList}?page=${pageNo}&search=${search}`);
  }

  export const GetCategoryDetails=(id)=>{
    return axios.get(`${AppConstants.baseUrl}${AppConstants.categoryDetails}${id}`);
  }


  //------------------- product apis --------------------------------------------------------


  export const  GetProductList=(pageNo,search)=>{
    return axios.get(`${AppConstants.baseUrl}${AppConstants.productList}?page=${pageNo}&search=${search}`);
  }

  export const GetProductDetails=(id)=>{
    return axios.get(`${AppConstants.baseUrl}${AppConstants.productDetails}${id}`);
  }
