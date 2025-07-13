import Header from './ui/landing-page/header';
import HeroSection from './ui/landing-page/hero-section';
import FeaturesSection from './ui/landing-page/features';
import TestimonialsSection from './ui/landing-page/testimonials';
import CallToAction from './ui/landing-page/call-to-action';
import Footer from './ui/landing-page/footer';
import ScrollToTop from './ui/landing-page/scroll-to-top';

export default function Page() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-grow pt-20 md:pt-24'>
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CallToAction />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
