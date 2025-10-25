import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Master Your <span className="text-blue-600">Presentations</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            AI-powered coaching to eliminate filler words, perfect your pacing, and deliver
            presentations with confidence.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/login">
              <Button size="lg">Get Started Free</Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Speech Analysis",
              description: "Real-time detection of filler words and speech patterns",
              icon: "🎤",
            },
            {
              title: "Pacing Coach",
              description: "Get feedback on your speaking speed and pauses",
              icon: "⏱️",
            },
            {
              title: "Gamified Learning",
              description: "Level up as you improve your presentation skills",
              icon: "🎮",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
