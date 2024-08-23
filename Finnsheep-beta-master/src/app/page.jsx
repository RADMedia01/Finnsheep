import { HeroScrollDemo } from "@/components/ui/HeroScrollDemo";
import { fetchTutors } from "./lib/data";
import SuperSearch from "./ui/superSearch/superSearch";
import TestimonialSlider from "./ui/TestimonialSlider/TestimonialSlider";
import FAQAccordion from "./ui/FAQAccordion/FAQAccordion";
import Cta from "./ui/cta/cta";
import RazorpaySubscriptionButton from "@/components/RazorpaySubscriptionButton";


import SliderCarousel from "@/components/ui/SliderCarousel";
import CategoriesList from "./ui/categoriesList/categoriesList";
import SubscriptionBanner from "./ui/subscriptionBanner/subscriptionBanner";
import CategoriesList2 from "./ui/categoriesList/categoriesList2";
import TrendingProducts from "./ui/trendingProducts/trendingProducts";



export default async function Home() {
  

  return (
    <div className="">
    <SliderCarousel />
    <div className=" mx-6 md:mx-20 my-14 md:my-28">
      <h2 className="md:text-4xl text-2xl font-medium mb-8">Categories</h2>
      <CategoriesList />

      









    </div>
    <div className=" mx-6 md:mx-20 my-14 md:my-28">
      {/* <TrendingProducts /> */}
      <TrendingProducts />
    </div>
    {/* <section className="pt-8 lg:pt-0 bg-[url('https://pagedone.io/asset/uploads/1691055810.png')] bg-center bg-cover">
      <HeroScrollDemo />
    </section> */}
     
    {/* <Cta /> */}
    
    <SubscriptionBanner/>
    <FAQAccordion />
    <TestimonialSlider />
  </div>
  );
}
