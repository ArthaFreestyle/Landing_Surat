// Surat landing page — root composition.

function Landing() {
  return (
    <div className="lp">
      <LandingNav />
      <main>
        <Hero />
        <DocStrip />
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

ReactDOM.createRoot(document.getElementById('root')).render(<Landing />);
