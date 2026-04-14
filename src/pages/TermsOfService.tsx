import { Helmet } from "react-helmet-async";
import { PageLayout, PageHero } from "@/components/layout/PageLayout";

const TermsOfService = () => (
  <PageLayout showTrustBar={false}>
    <Helmet>
      <title>Terms of Service | Select Source Water</title>
      <meta name="description" content="Terms of service for Select Source Water. Review the terms governing use of our website and services." />
    </Helmet>

    <PageHero title="Terms of Service" description="Last updated: April 2026" />

    <section className="py-16 bg-background">
      <div className="container max-w-3xl prose prose-slate dark:prose-invert">
        <h2>Acceptance of Terms</h2>
        <p>By accessing and using the Select Source Water website, you agree to be bound by these Terms of Service. If you do not agree, please do not use our website.</p>

        <h2>Services</h2>
        <p>Select Source Water provides residential water treatment services including free in-home water testing, system installation, and ongoing maintenance in the Inland Empire region of Southern California.</p>

        <h2>Free Water Test</h2>
        <p>Our free in-home water test is provided at no cost and with no obligation to purchase. Test results are for informational purposes and may vary based on water source conditions.</p>

        <h2>Warranty</h2>
        <p>All HYGIA+ whole-home water systems include a Lifetime Warranty covering manufacturing defects and system performance. Warranty terms are provided in full at the time of installation. The 5-Day Risk-Free Trial allows customers to cancel within 5 days of installation for a full refund.</p>

        <h2>Limitation of Liability</h2>
        <p>Select Source Water shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or services. Our total liability shall not exceed the amount paid for the specific service in question.</p>

        <h2>Intellectual Property</h2>
        <p>All content on this website, including text, images, logos, and design, is the property of Select Source Water LLC and is protected by applicable copyright and trademark laws.</p>

        <h2>Changes to Terms</h2>
        <p>We reserve the right to update these terms at any time. Continued use of the website after changes constitutes acceptance of the updated terms.</p>

        <h2>Contact</h2>
        <p>
          Select Source Water LLC<br />
          790 Beaumont Ave Ste 124, Beaumont, CA 92223<br />
          Phone: <a href="tel:+19514995136">(951) 499-5136</a><br />
          Email: <a href="mailto:info@selectsourcewatercalifornia.com">info@selectsourcewatercalifornia.com</a>
        </p>
      </div>
    </section>
  </PageLayout>
);

export default TermsOfService;
