import { LandingNav } from "./components/landing-nav";
import { Hero } from "./components/landing-hero";
import { DocStrip, HowItWorks, Privacy } from "./components/landing-sections";
import { ProductSuite } from "./components/landing-products";
import { Pricing } from "./components/landing-pricing";
import { FAQ } from "./components/landing-faq";
import { FinalCTA, Footer } from "./components/landing-footer";

export default function Home() {
  return (
    <div className="lp">
      <LandingNav />
      <main>
        <Hero />
        <DocStrip />
        <ProductSuite docType="kelompok-tani" />
        <HowItWorks />
        <Privacy />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
