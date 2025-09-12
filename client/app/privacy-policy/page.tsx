import { FadeInSection } from "@/components/animations/FadeInSection"
import { AnimatedText } from "@/components/animations/AnimatedText"

function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <FadeInSection delay={200} direction="up">
        <div className="text-center mb-8 md:mb-12">
          <AnimatedText
            text="Privacy Policy"
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-cyan-600 via-blue-600 to-green-600 bg-clip-text text-transparent"
            delay={500}
            speed={50}
          />
          <p className="text-lg text-gray-600">Last updated: August 7, 2025</p>
        </div>
      </FadeInSection>

      <div className="space-y-8 text-gray-700">
        <FadeInSection delay={300} direction="up">
          <section>
            <p>
              This Privacy Policy explains how we at <strong>Wikixp.org</strong>, operated by <strong>CBM Media</strong>, 
              collect, use, and protect your personal information. We are committed to protecting your privacy and 
              complying with applicable laws. This policy also explains our practices regarding children under 13.
            </p>
          </section>
        </FadeInSection>

        <FadeInSection delay={400} direction="up">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Children Under 13</h2>
            <p>
              We do not knowingly collect personal information from children under the age of 13 unless permitted by law. 
              If we discover that we have collected data from a child under 13, we will promptly delete it. Parents who 
              believe their child has submitted information should contact us directly.
            </p>
          </section>
        </FadeInSection>

        <FadeInSection delay={500} direction="up">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">General</h2>
            <p>
              We collect user information to provide a customized experience on megagamefun.org. This includes tailoring content, 
              services, and advertising to meet your preferences. You may be asked to register in certain areas of our site. 
              If you choose not to register, some areas of the site may be inaccessible.
            </p>
          </section>
        </FadeInSection>

        <FadeInSection delay={600} direction="up">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Use of Information</h2>
            <p>
              When registering, we only ask for a nickname and password. Your password is securely encrypted.
            </p>
            <p>
              Our servers log IP addresses for diagnostic, demographic, and security purposes. This may be used to target ads or prevent abuse.
            </p>
            <p>
              We use cookies to:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Save your login information (encrypted).</li>
              <li>Customize content and advertisements based on your interests.</li>
            </ul>
            <p className="mt-3">
              Your browser allows you to manage cookie settings, including blocking or deleting cookies.
            </p>
          </section>
        </FadeInSection>

        <FadeInSection delay={700} direction="up">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Advertising and Third Parties</h2>
            <p>
              We partner with third-party companies, including Google, to serve ads. These third parties may place cookies 
              on your browser to:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Display interest-based ads.</li>
              <li>Measure ad effectiveness.</li>
              <li>Track interaction with ads.</li>
            </ul>
            <p className="mt-3">
              We are not responsible for the privacy policies of other websites linked from megagamefun.org.
            </p>
          </section>
        </FadeInSection>

        <FadeInSection delay={800} direction="up">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Google Analytics</h2>
            <p>
              Wikixp.org uses:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Google Analytics Demographics and Interest Reporting.</li>
              <li>Google Display Network Impression Reporting.</li>
              <li>Remarketing with Google Analytics.</li>
              <li>DoubleClick integration.</li>
            </ul>
            <p className="mt-3">
              These services help us understand audience behavior and improve content and advertising. 
              Data is collected via cookies but does not include personally identifiable information.
            </p>
            <p className="mt-3">
              You can opt out of Google Analytics through:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Google Ads Settings</li>
              <li>Google Analytics Opt-out Add-on</li>
            </ul>
          </section>
        </FadeInSection>

        <FadeInSection delay={900} direction="up">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">DoubleClick DART Cookies</h2>
            <p>
              We may use Google’s DoubleClick DART cookies for serving interest-based ads. 
              These cookies do not track personal data like name or address. 
              You can opt out of this feature by visiting the Network Advertising Initiative Opt-out Page.
            </p>
          </section>
        </FadeInSection>

        <FadeInSection delay={1000} direction="up">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Cookie Policy</h2>
            <p>Cookies help us improve your experience. We and our advertising partners may use cookies to:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Operate site features</li>
              <li>Authenticate users</li>
              <li>Remember preferences</li>
              <li>Serve personalized ads</li>
            </ul>
            <p className="mt-3">
              We also use Google Ads remarketing cookies, which may show you ads across the web based on your previous interactions with Wikixp.org.
            </p>
            <p className="mt-3 font-semibold">Managing Cookies:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Chrome: Settings → Privacy → Clear Browsing Data</li>
              <li>Firefox: Options → Privacy & Security → Cookies and Site Data</li>
              <li>Internet Explorer: Tools → Internet Options → General → Delete</li>
            </ul>
            <p className="mt-3">
              Note: Some site features may not work properly without cookies.
            </p>
          </section>
        </FadeInSection>

        <FadeInSection delay={1100} direction="up">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Information Sharing</h2>
            <p>
              We do not share your personally identifiable information with third parties, except:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Vendors or service providers working on our behalf.</li>
              <li>When required by law.</li>
              <li>To protect our rights or in emergencies.</li>
              <li>In the event of a company acquisition or merger.</li>
            </ul>
          </section>
        </FadeInSection>

        <FadeInSection delay={1200} direction="up">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Security Measures</h2>
            <p>
              We implement security technologies including:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Firewalls</li>
              <li>Encrypted databases</li>
              <li>Access restrictions</li>
            </ul>
            <p className="mt-3">
              However, no data transmission over the internet is 100% secure. Use caution when sharing personal information.
            </p>
          </section>
        </FadeInSection>

        <FadeInSection delay={1300} direction="up">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Public Forums</h2>
            <p>
              Any content you post (reviews, comments, multiplayer usernames) may be visible to others. 
              Do not share personal information publicly.
            </p>
          </section>
        </FadeInSection>

        <FadeInSection delay={1400} direction="up">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Refer-a-Friend</h2>
            <p>
              If you use our refer-a-friend feature, we may ask for your friend’s email. 
              This is used solely to send a one-time invite email.
            </p>
          </section>
        </FadeInSection>

        <FadeInSection delay={1500} direction="up">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Archived Information</h2>
            <p>
              We maintain backups and archives for disaster recovery and legal compliance. 
              Some deleted information may remain in archived logs.
            </p>
          </section>
        </FadeInSection>

        <FadeInSection delay={1600} direction="up">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Binding Agreement</h2>
            <p>
              By using megagamefun.org, you agree to the terms of this Privacy Policy and our Terms of Use. 
              We may update this Privacy Policy periodically. Your continued use of the site implies 
              acceptance of the updated terms.
            </p>
          </section>
        </FadeInSection>
      </div>
    </div>
  )
}

export default PrivacyPolicyPage
