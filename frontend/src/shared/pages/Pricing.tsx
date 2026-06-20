import { useState } from "react";

const PLANS = [
  {
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Perfect for individuals and small teams just getting started.",
    cta: "Get Started",
    ctaLink: "/signup",
    featured: false,
    features: [
      "1 active job post",
      "Up to 20 applicants per post",
      "Basic applicant profiles",
      "Email notifications",
      "7-day post duration",
    ],
    missing: [
      "Featured listings",
      "Analytics dashboard",
      "Priority support",
      "Company profile page",
    ],
  },
  {
    name: "Pro",
    monthlyPrice: 49,
    yearlyPrice: 39,
    description: "For growing companies that hire regularly and need more reach.",
    cta: "Start Free Trial",
    ctaLink: "/signup?plan=pro",
    featured: true,
    features: [
      "10 active job posts",
      "Unlimited applicants",
      "Full applicant profiles & resumes",
      "Featured listings",
      "Analytics dashboard",
      "30-day post duration",
      "Company profile page",
      "Email & chat support",
    ],
    missing: [
      "Dedicated account manager",
      "Custom branding",
    ],
  },
  {
    name: "Enterprise",
    monthlyPrice: 149,
    yearlyPrice: 119,
    description: "For large organizations with high-volume hiring and custom needs.",
    cta: "Contact Sales",
    ctaLink: "/contact",
    featured: false,
    features: [
      "Unlimited job posts",
      "Unlimited applicants",
      "Advanced analytics & reporting",
      "Featured & promoted listings",
      "Custom company branding",
      "Dedicated account manager",
      "API access",
      "SSO & team management",
      "Priority 24/7 support",
    ],
    missing: [],
  },
];

const FAQS = [
  {
    q: "Can I switch plans at any time?",
    a: "Yes — you can upgrade or downgrade at any time. Changes take effect at the start of your next billing cycle.",
  },
  {
    q: "Is there a free trial for Pro?",
    a: "Absolutely. Pro comes with a 14-day free trial, no credit card required.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards (Visa, Mastercard, Amex) as well as PayPal.",
  },
  {
    q: "Can job seekers use HireFlow for free?",
    a: "Yes — job seekers can always browse, apply, and manage applications completely free. Pricing only applies to employers posting jobs.",
  },
  {
    q: "What happens when my post expires?",
    a: "Your post will be archived but not deleted. You can renew it from your dashboard at any time.",
  },
];

const Pricing = () => {
  const [yearly, setYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="w-full flex flex-col bg-gray-50 min-h-screen">

      {/* Hero */}
      <section className="w-full bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center flex flex-col items-center gap-6">
          <span className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 text-xs font-semibold px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 inline-block" />
            Simple Pricing
          </span>
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Plans for every <span className="text-indigo-600">stage of growth</span>
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            Start free, scale when you're ready. No hidden fees, no surprises.
          </p>

          {/* Toggle */}
          <div className="flex items-center gap-3 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${!yearly ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${yearly ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}
            >
              Yearly
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">Save 20%</span>
            </button>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="w-full max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl flex flex-col gap-6 p-7 ${
                plan.featured
                  ? "bg-indigo-600 text-white shadow-xl ring-2 ring-indigo-500 ring-offset-2"
                  : "bg-white border border-gray-100 shadow-sm"
              }`}
            >
              {/* Header */}
              <div className="flex flex-col gap-1">
                {plan.featured && (
                  <span className="text-xs font-bold bg-indigo-500 text-indigo-100 px-3 py-1 rounded-full w-fit mb-2">
                    Most Popular
                  </span>
                )}
                <h2 className={`text-xl font-extrabold ${plan.featured ? "text-white" : "text-gray-900"}`}>
                  {plan.name}
                </h2>
                <p className={`text-sm leading-relaxed ${plan.featured ? "text-indigo-200" : "text-gray-500"}`}>
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-end gap-1">
                <span className={`text-5xl font-extrabold ${plan.featured ? "text-white" : "text-gray-900"}`}>
                  ${yearly ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                {plan.monthlyPrice > 0 && (
                  <span className={`text-sm mb-2 ${plan.featured ? "text-indigo-300" : "text-gray-400"}`}>
                    / mo
                  </span>
                )}
                {plan.monthlyPrice === 0 && (
                  <span className={`text-sm mb-2 ${plan.featured ? "text-indigo-300" : "text-gray-400"}`}>
                    forever
                  </span>
                )}
              </div>

              {/* Features */}
              <div className="flex flex-col gap-2.5">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-center gap-2.5">
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-xs shrink-0 ${plan.featured ? "bg-indigo-500 text-white" : "bg-indigo-100 text-indigo-600"}`}>
                      ✓
                    </span>
                    <span className={`text-sm ${plan.featured ? "text-indigo-100" : "text-gray-700"}`}>{f}</span>
                  </div>
                ))}
                {plan.missing.map((f) => (
                  <div key={f} className="flex items-center gap-2.5 opacity-40">
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-xs shrink-0 ${plan.featured ? "bg-indigo-700" : "bg-gray-100"}`}>
                      –
                    </span>
                    <span className={`text-sm ${plan.featured ? "text-indigo-200" : "text-gray-400"}`}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold tracking-widest text-indigo-500 uppercase mb-1">Got questions?</p>
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked</h2>
          </div>
          <div className="flex flex-col divide-y divide-gray-100">
            {FAQS.map(({ q, a }, i) => (
              <div key={i} className="py-5">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex justify-between items-center text-left gap-4"
                >
                  <span className="font-semibold text-gray-900 text-sm">{q}</span>
                  <span className={`text-indigo-500 text-lg transition-transform shrink-0 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                </button>
                {openFaq === i && (
                  <p className="mt-3 text-gray-500 text-sm leading-relaxed">{a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-indigo-600">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center flex flex-col items-center gap-6">
          <h2 className="text-3xl font-extrabold text-white">Start hiring smarter today</h2>
          <p className="text-indigo-200">No credit card required. Up and running in minutes.</p>
          <a href="/companies/signup" className="bg-white text-indigo-600 font-bold px-10 py-3 rounded-xl hover:bg-indigo-50 transition-colors">
            Get Started Free
          </a>
        </div>
      </section>

    </main>
  );
};

export default Pricing;