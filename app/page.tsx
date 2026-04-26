import { Contact } from "./_components/contact";
import { Footer } from "./_components/footer";
import { Hero } from "./_components/hero";
import { HowItWorks } from "./_components/how-it-works";
import { Nav } from "./_components/nav";
import { Outputs } from "./_components/outputs";
import { UseCases } from "./_components/use-cases";
import { YCTrustRow } from "./_components/yc-trust-row";

export default function Page() {
  return (
    <>
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Outputs />
        <UseCases />
        <HowItWorks />
        <YCTrustRow />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
