import Wrapper from "@/components/Wrapper";
import Hero from "@/sections/Hero";
import Image from "next/image";
const features = [
  {
    title: "AI-Powered Research",
    description:
      "Save hours by getting AI summaries of trending market reports in seconds.",
    icon: "\u2728",
  },
  {
    title: "Curated Opportunities",
    description:
      "Receive tailored startup ideas based on your interests and goals.",
    icon: "\uD83D\uDCAC",
  },
  {
    title: "Founder Network",
    description:
      "Connect with 65,000+ builders and investors ready to collaborate.",
    icon: "\uD83D\uDC65",
  },
];

const testimonials = [
  {
    name: "Sarah J.",
    text: "I launched my SaaS after reading just 3 reports. This platform is a goldmine!",
    avatar: "/avatars/avatar-1.jpg",
  },
  {
    name: "Leo M.",
    text: "Insightful, easy to digest, and always relevant. A must-have for early-stage founders.",
    avatar: "/avatars/avatar-2.jpg",
  },
  {
    name: "Nina T.",
    text: "I've found co-founders and new startup ideas all in one place. Phenomenal resource!",
    avatar: "/avatars/avatar-3.jpg",
  },
];

const plans = [
  {
    name: "Basic",
    price: "$9/mo",
    description: "Perfect for individual founders",
    features: [
      "1 Newsletter Project",
      "Email Reports",
      "Basic Analytics",
      "5,000 Monthly Emails",
    ],
    cta: "Start Basic",
  },
  {
    name: "Pro",
    price: "$29/mo",
    description: "For growing newsletters and small teams",
    features: [
      "Unlimited Projects",
      "Advanced Analytics",
      "A/B Testing",
      "25,000 Monthly Emails",
    ],
    cta: "Go Pro",
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Best for large scale teams",
    features: [
      "Dedicated Support",
      "Custom Integrations",
      "Priority Uptime SLA",
      "Unlimited Emails",
    ],
    cta: "Contact Sales",
  },
];

export default function Home() {
  return (
    <Wrapper>
      <Hero />
      {/* Add more scrollable sections below if needed */}
      <section className="py-20 px-4 sm:px-10 lg:px-20">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold">
            Features that save time & spark ideas
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <div
              key={i}
              className="p-6 rounded-xl shadow-md"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 ">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold">Simple pricing, no surprises</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Plans for every stage of your founder journey.
          </p>
        </div>
        <div className="mt-16 grid gap-8 max-w-6xl mx-auto sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="flex flex-col justify-between rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm hover:shadow-lg transition"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {plan.name}
                </h2>
                <p className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
                  {plan.price}
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {plan.description}
                </p>

                <ul className="mt-6 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2 text-green-500">✓</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <button className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-100 transition">
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 ">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-bold">Loved by startup founders</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className=" p-6 rounded-xl shadow-md text-left"
            >
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                “{t.text}”
              </p>
              <div className="flex items-center gap-3">
                <Image
                  src={t.avatar}
                  width={40}
                  height={40}
                  alt="avatar"
                  className="rounded-full border border-gray-300 dark:border-gray-600"
                />
                <span className="font-semibold text-sm">{t.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Wrapper>
  );
}
