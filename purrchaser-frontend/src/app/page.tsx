import { Header } from '@/components/nav/Header'
import {Hero} from "@/components/hero/Hero";
import Trending from "@/components/listings/Trending";
import {Testimonials} from "@/components/hero/Testimonials";
import {Footer} from "@/components/Footer";
import RecentlyPurchased from "@/components/listings/RecentlyPurchased";
import AvailableForSale from "@/components/listings/AvailableForSale";

export default function Home() {
  return (
      <>
        <Header />
        <main>
            <Hero/>
            <Trending/>
            <RecentlyPurchased/>
            <AvailableForSale/>
            <Testimonials/>
        </main>
          <Footer/>
      </>
  )
}
