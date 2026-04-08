import { Helmet } from "react-helmet-async";
import { PageLayout, PageHero } from "@/components/layout/PageLayout";

const PrivacyPolicy = () => (
  <PageLayout showTrustBar={false}>
    <Helmet>
      <title>Privacy Policy | Select Source Water</title>
      <meta name="description" content="Privacy policy for Select Source Water. Learn how we collect, use, and protect your personal information." />
    </Helmet>

    <PageHero title="Privacy Policy" description="Last updated: April 2026" />

    <section className="py-16 bg-background">
      <div className="container max-w-3xl prose prose-slate dark:prose-invert">
        <h2>Information We Collect</h2>
        <p>When you request a free water test, schedule service, or contact us, we may collect your name, phone number, email address, and home address. This information is used solely to provide you with water treatment services and communicate with you about your account.</p>

        <h2>How We Use Your Information</h2>
        <ul>
          <li>Schedule and perform in-home water tests</li>
          <li>Provide quotes and installation services</li>
          <li>Send appointment reminders and service updates</li>
          <li>Respond to your questions and requests</li>
        </ul>

        <h2>Information Sharing</h2>
        <p>We do not sell, trade, or rent your personal information to third parties. We may share limited information with trusted service partners (e.g., Home Depot) solely to fulfill services you've requested.</p>

        <h2>Data Security</h2>
        <p>We implement reasonable security measures to protect your personal information from unauthorized access, alteration, or disclosure.</p>

        <h2>Cookies</h2>
        <p>Our website may use cookies and similar technologies to improve your browsing experience and analyze site traffic. You can control cookie settings through your browser preferences.</p>

        <h2>Your Rights</h2>
        <p>California residents have additional rights under the CCPA, including the right to know what personal information we collect and the right to request deletion. Contact us to exercise these rights.</p>

        <h2>Contact Us</h2>
        <p>
          Select Source Water LLC<br />
          790 Beaumont Ave Ste 124, Beaumont, CA 92223<br />
          Phone: <a href="tel:+19516124094">(951) 612-4094</a><br />
          Email: <a href="mailto:info@selectsourcewatercalifornia.com">info@selectsourcewatercalifornia.com</a>
        </p>
      </div>
    </section>
  </PageLayout>
);

export default PrivacyPolicy;
