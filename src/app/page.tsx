import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import Broker from '@/components/Broker';
import DailyQuote from '@/components/DailyQuote';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import UsefulLinks from '@/components/UsefulLinks';

export default function Home() {
  return (
    <main className="main-container">
      <Header />
      <div className="content-wrapper">
        <Hero />
        <Features />
        <Pricing />
        <Broker />
        <DailyQuote />
        <Gallery />
        <Testimonials />
        <UsefulLinks />
      </div>
      
    </main>
  );
}
