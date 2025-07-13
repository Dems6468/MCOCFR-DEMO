import HeroSection from './ui/landing-page/hero-section';
import FeaturesSection from './ui/landing-page/features';
import Footer from './ui/landing-page/footer';
import ScrollToTop from './ui/landing-page/scroll-to-top';

export default function Page() {
  return (
    <div className='flex flex-col min-h-screen'>
      <main className='flex-grow'>
        <HeroSection />
        <FeaturesSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
