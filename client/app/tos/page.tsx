import { FadeInSection } from "@/components/animations/FadeInSection"
import { AnimatedText } from "@/components/animations/AnimatedText"
import DefaultLayout from "@/components/layout"

function Tos() {
  return (
     <DefaultLayout>
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

      <FadeInSection delay={200} direction="up">
        <div className="text-center mb-8 md:mb-12">
          <AnimatedText
            text="TOS"
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
             By accessing or using megagamefun.org (referred to as "the Website", "we", "us", or "our"), including any embedded games, downloadable content, or related services, you agree to comply with these Terms of Use and our Privacy Policy. If you do not agree to any part of these terms, you are not authorized to use the Website.
            </p>
            <p className="mt-2">
             We reserve the right to update or modify these Terms at any time without prior notice. Users are responsible for regularly reviewing this page to stay informed of any changes.
            </p>
          </section>
        </FadeInSection>

         <FadeInSection delay={300} direction="up">
          <section>
             <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Access Restrictions
            </h2>
            <p>
            Wikixp.org is intended for users aged 13 years and older. If you are under 13, you may only use the Website under the supervision of a parent or legal guardian.
            </p>
            
          </section>
        </FadeInSection>

         <FadeInSection delay={300} direction="up">
          <section>
             <h2 className="text-2xl font-bold text-gray-900 mb-3">
             User Conduct
            </h2>
            <p>
              By using our Website, you agree not to:

            Use the Website for any unlawful purpose.
            Attempt to interfere with the operation or security of the Website.
            Upload or distribute any harmful code or software.
            Post or share offensive, discriminatory, or inappropriate content through any feature of the Website.
            We reserve the right to restrict or terminate access for users who violate these terms.
            </p>
            
          </section>
        </FadeInSection>

         <FadeInSection delay={300} direction="up">
          <section>
             <h2 className="text-2xl font-bold text-gray-900 mb-3">
3. Intellectual Property and Game Rights
            </h2>
            <p>
            Most games featured on megagamefun.org are submitted by developers or sourced from public platforms with assumed permission from original content owners. All rights to the games remain with their respective creators.

We do not claim ownership over third-party content unless explicitly stated.

If you believe a game or asset infringes your copyright or intellectual property rights, please contact us with valid documentation. Upon proper notification, we will promptly investigate and remove the content if necessary.
            </p>
            
          </section>
        </FadeInSection>

        <FadeInSection delay={300} direction="up">
          <section>
             <h2 className="text-2xl font-bold text-gray-900 mb-3">
        4. Third-Party Links
            </h2>
            <p>
          The Website may contain outgoing links to external websites or may be linked from other websites. We are not responsible for the content, security, or practices of any third-party sites, even if linked from our games or pages.

          Users should exercise caution and review the privacy policies and terms of external sites.
            </p>
            
          </section>
        </FadeInSection>

         <FadeInSection delay={300} direction="up">
          <section>
             <h2 className="text-2xl font-bold text-gray-900 mb-3">
        5. Advertisements

            </h2>
            <p>
          Wikixp.org may display advertisements provided by third-party ad networks such as Google AdSense. These ads are served based on user behavior and interest categories.

We do not endorse or take responsibility for the content of third-party ads displayed on the Website. Any issues or disputes arising from ad content should be addressed directly with the respective advertisers.
            </p>
            
          </section>
        </FadeInSection>
         <FadeInSection delay={300} direction="up">
          <section>
             <h2 className="text-2xl font-bold text-gray-900 mb-3">
6. Disclaimer and Limitation of Liability

            </h2>
            <p>
       All content on Wikixp.org is provided “as is” without warranties of any kind. We do not guarantee:

Accuracy or completeness of the content.
Continuous or error-free access to the Website.
That games will be free from bugs or malware.
To the maximum extent permitted by law, CBM Media shall not be liable for any direct, indirect, incidental, or consequential damages resulting from your use of the Website.
            </p>
          </section>
        </FadeInSection>

         <FadeInSection delay={300} direction="up">
          <section>
             <h2 className="text-2xl font-bold text-gray-900 mb-3">
7. Disclaimer and Limitation of Liability

            </h2>
            <p>
       We may terminate or suspend access to the Website at our sole discretion, without notice, for conduct that violates these Terms or is harmful to other users or the platform.
            </p>
          </section>
        </FadeInSection>
        <FadeInSection delay={300} direction="up">
          <section>
             <h2 className="text-2xl font-bold text-gray-900 mb-3">
     8. Governing Law

            </h2>
            <p>
These Terms shall be governed by and construed in accordance with the laws of [Insert Your Jurisdiction or Country], without regard to its conflict of law principles.
            </p>
          </section>
        </FadeInSection>
        </div>
   </div>
    </DefaultLayout>
  )
}

export default Tos
