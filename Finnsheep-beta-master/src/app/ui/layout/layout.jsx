"use client";


import { usePathname } from 'next/navigation';
import Header from '../header/header';
import Footer from '../footer/footer';
import SessionWrapper from '@/components/SessionWrapper';
import { makeStore, store } from '@/lib/store/store';
import { Provider } from 'react-redux';
import { useRef } from 'react';
import { add } from '@/lib/store/features/cart/cartSlice';

const Layout = ({ children }) => {
    const pathname = usePathname();

    // List of paths where you want to hide the header and footer
    const hideHeaderAndFooter = ['/login', '/register',  '/dashboard', '/auth/account-recovery', 'cart'];
    

    const shouldHideHeaderAndFooter = hideHeaderAndFooter.some(path => pathname.startsWith(path)) ||
    pathname === '/sho' || 
    pathname.startsWith('/auth');

    const hideFooterOnly = pathname === '/cart';


    const storeRef = useRef()
    if (!storeRef.current) {
      // Create the store instance the first time this renders
      storeRef.current = makeStore()
    //   storeRef.current.dispatch(add("testproductid"))
    }  


    return (
      <SessionWrapper>
         <Provider store={storeRef.current}>
        <div className=" ">
            {/* {!shouldHideHeaderAndFooter && <Header  className="sticky top-0 z-50 bg-white shadow-md"/>} */}
            {!shouldHideHeaderAndFooter && 
            <Header  />}
            
            

            <main className="flex-gro mt-[4.8rem ">
                {children}
            </main>
            {!shouldHideHeaderAndFooter && !hideFooterOnly  && <Footer />}
        </div>
        </Provider> 
        </SessionWrapper>

    );
};

export default Layout;
