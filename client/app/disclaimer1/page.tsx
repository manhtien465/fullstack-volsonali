import { FadeInSection } from "@/components/animations/FadeInSection"
import { AnimatedText } from "@/components/animations/AnimatedText"

function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <FadeInSection delay={200} direction="up">
        <div className="text-center mb-8 md:mb-12">
          <AnimatedText
            text="Disclaimer"
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-cyan-600 via-blue-600 to-green-600 bg-clip-text text-transparent"
            delay={500}
            speed={50}
          />
        </div>
      </FadeInSection>

      <div className="space-y-8 text-gray-700">
        <FadeInSection delay={300} direction="up">
          <section>
            <p>
              The content on <strong>megagamefun.org</strong> is independently created and curated by our editorial team. All
              original content, including articles, reviews, and media, is protected under copyright law. All rights are
              reserved by <strong>CBM Media</strong>.
            </p>
            <p className="mt-2">
              Any unauthorized use, reproduction, or redistribution of our content may constitute a violation of
              intellectual property rights and may lead to legal action.
            </p>
          </section>
        </FadeInSection>

        <FadeInSection delay={400} direction="up">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Compliance with Advertising and Software Policies
            </h2>
            <p>We strictly comply with the following industry policies and guidelines:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Google Ads Advertising Policies</li>
              <li>Google Unwanted Software Policy</li>
              <li>Microsoft Advertising Policies</li>
            </ul>
            <p className="mt-2">
              All advertising and content practices on <strong>megagamefun.org</strong> are aligned with these standards to
              ensure user safety, transparency, and responsible ad behavior.
            </p>
          </section>
        </FadeInSection>

        <FadeInSection delay={500} direction="up">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Third-Party Links and App Sources</h2>
            <p>
              Our website may include external download links for games or apps. We only provide links to official and
              verified sources, such as:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Developers’ official websites</li>
              <li>Google Play Store</li>
              <li>Apple App Store</li>
              <li>Other legitimate digital storefronts</li>
            </ul>
            <p className="mt-2">
              We do not host, modify, or distribute any third-party apps or games ourselves.
            </p>
          </section>
        </FadeInSection>

        <FadeInSection delay={600} direction="up">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">No System Modification</h2>
            <p>
              All applications and games mentioned or linked on <strong>megagamefun.org</strong> do not alter system settings
              or introduce unwanted software on users&apos; devices. We do not promote or support any form of malicious
              software, adware, or system-altering code.
            </p>
          </section>
        </FadeInSection>

        <FadeInSection delay={700} direction="up">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Liability</h2>
            <p>
              <strong>CBM Media</strong> and <strong>megagamefun.org</strong> shall not be held responsible for any damage or
              issues resulting from the use of third-party websites, links, or software referenced on our platform. Users
              should always exercise discretion and verify sources before downloading or installing any software.
            </p>
          </section>
        </FadeInSection>
      </div>
    </div>
  )
}
export default DisclaimerPage
