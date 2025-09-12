import { Card, CardContent } from "@/components/ui/card"
import { Users, Target, Award, Heart } from "lucide-react"
import { FadeInSection } from "@/components/animations/FadeInSection"
import { AnimatedText } from "@/components/animations/AnimatedText"

const teamMembers = [
  {
    name: "Alex Johnson",
    role: "Founder & CEO",
    image: "/placeholder.svg?height=150&width=150",
    description: "Gaming enthusiast with 10+ years in the industry, driving our vision.",
  },
  {
    name: "Sarah Chen",
    role: "Lead Developer",
    image: "/placeholder.svg?height=150&width=150",
    description: "HTML5 game development expert and tech innovator, building our platform.",
  },
  {
    name: "Mike Rodriguez",
    role: "Content Manager",
    image: "/placeholder.svg?height=150&width=150",
    description: "Gaming journalist and content strategy specialist, curating our content.",
  },
]

const stats = [
  { icon: <Users className="w-8 h-8" />, value: "2M+", label: "Active Players" },
  { icon: <Target className="w-8 h-8" />, value: "500+", label: "Games Available" },
  { icon: <Award className="w-8 h-8" />, value: "50+", label: "Awards Won" },
  { icon: <Heart className="w-8 h-8" />, value: "99%", label: "User Satisfaction" },
]

export default function AboutUsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Hero Section */}
      <FadeInSection delay={200} direction="up">
        <div className="text-center mb-12 md:mb-16">
          <AnimatedText
            text="About Us"
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-cyan-600 via-blue-600 to-green-600 bg-clip-text text-transparent"
            delay={500}
            speed={50}
          />
         
          

            <FadeInSection delay={300} direction="up">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3"> Welcome to megagamefun.org – Your Ultimate Destination for Fun, Free, and Addictive Online Games!</h2>
            <p>
              The content on <strong>megagamefun.org</strong> is independently created and curated by our editorial team. All
              original content, including articles, reviews, and media, is protected under copyright law. All rights are
              reserved by <strong>CBM Media</strong>.
            </p>
            <p className="mt-2">
             Looking for exciting, high-quality, and totally free games to play online? You're in the right place! megagamefun.org is one of the most dynamic and growing online gaming platforms where fun meets variety. Whether you're into action, racing, puzzle, shooting, or dress-up games – we’ve got you covered.
            </p>
             <p className="mt-2">
At megagamefun.org, our mission is simple: to deliver the best online gaming experience to players of all ages. All of our games are 100% free to play and are fully compatible across devices – so you can enjoy them on your desktop, tablet, or smartphone, anytime, anywhere.
            </p>
              <p className="mt-2">
We constantly update our game library with fresh titles and hidden gems, carefully selected to ensure top performance and endless entertainment. Our team puts in the work to research, test, and feature only the best games available on the web.
            </p>
             <p className="mt-2">
Explore categories like girls’ games, 3D games, racing, sports, shooters, and many more. Whether you’re here to kill a few minutes or spend hours discovering new favorites, megagamefun.org is designed to keep you entertained non-stop.
            </p>
            <p className="mt-2">
Come play, discover, and have fun – all in one place.
            </p>
              <p className="mt-2">
Let the games begin!
            </p>
          </section>
        </FadeInSection>

         
        </div>
      </FadeInSection>

      {/* Stats Section */}
      {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 md:mb-16">
        {stats.map((stat, index) => (
          <FadeInSection key={index} delay={index * 100 + 300} direction="scale">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 flex flex-col items-center justify-center">
                <div className="flex justify-center text-cyan-600 mb-3">{stat.icon}</div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          </FadeInSection>
        ))}
      </div> */}

      {/* Mission & Offer Section */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12 md:mb-16">
        <FadeInSection delay={400} direction="left">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              At MegaGameFun, we believe that knowledge should be accessible to everyone. That's why we focus on creating
              comprehensive, well-organized content that's easy to find and understand.
            </p>
            <p className="text-gray-600">
              We carefully curate our content to ensure accuracy, relevance, and most importantly, value for our
              readers. Whether you're looking for quick answers or in-depth guides, we've got you covered.
            </p>
          </div>
        </FadeInSection>
        <FadeInSection delay={500} direction="right">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-cyan-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Comprehensive knowledge base and articles</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-cyan-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Regular content updates and improvements</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-cyan-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Expert tips and detailed guides</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-cyan-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Latest news and updates</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-cyan-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Mobile-optimized reading experience</span>
              </li>
            </ul>
          </div>
        </FadeInSection>
      </div> */}

      {/* Team Section */}
      

      {/* Contact Section */}
      <FadeInSection delay={800} direction="scale">
        <Card className="bg-cyan-50 border-cyan-200 shadow-lg">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-gray-600 mb-4">
              Have questions, suggestions, or want to collaborate? We'd love to hear from you!
            </p>
            <div className="space-y-2 text-gray-600">
              <p>
                Email:{" "}
                <a href="mailto:contact@megagamefun.org" className="text-cyan-600 hover:underline">
                  contact@megagamefun.org
                </a>
              </p>
              <p>Follow us on social media for the latest updates</p>
            </div>
          </CardContent>
        </Card>
      </FadeInSection>
    </div>
  )
}
