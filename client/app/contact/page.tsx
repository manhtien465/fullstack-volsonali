import { FadeInSection } from "@/components/animations/FadeInSection"
import { AnimatedText } from "@/components/animations/AnimatedText"
import { Mail } from "lucide-react"

function Contact() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <FadeInSection delay={200} direction="up">
        <div className="text-center mb-12 md:mb-16">
          <AnimatedText
            text="Contact"
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-600 via-blue-600 to-green-600 bg-clip-text text-transparent"
            delay={500}
            speed={50}
          />
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            We’d love to hear from you! Whether it’s feedback, suggestions, or
            ideas for new games, feel free to reach out.
          </p>
        </div>

         <FadeInSection delay={300} direction="up">
          <section>
            <p>
               At <span className="font-semibold text-gray-900">megagamefun.org</span>,
              your privacy matters. We only collect the information necessary to
              respond to your message.
            </p>
           <p className="text-gray-700 mb-6">
              Please note:{" "}
              <span className="font-semibold">megagamefun.org</span> is not the
              developer or owner of the games featured. We simply provide a
              platform to enjoy free online games from various publishers.
            </p>
             <div className="flex items-center justify-center gap-2 text-lg font-medium text-blue-600 hover:text-blue-700 transition-colors">
              <Mail className="w-5 h-5" />
              <a href="mailto:cbmmedia.ltd@gmail.com">cbmmedia.ltd@gmail.com</a>
            </div>
          </section>
        </FadeInSection>
        {/* Contact Card */}
       
      </FadeInSection>
    </div>
  )
}

export default Contact
