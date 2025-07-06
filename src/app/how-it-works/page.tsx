'use client'

import { motion } from 'framer-motion'
import { ArrowRight, DollarSign, PenTool, Mic, BarChart2, Users } from 'lucide-react'
import Link from 'next/link'

export default function HowItWorks() {
  const steps = [
    {
      icon: <PenTool className="w-8 h-8" />,
      title: "1. Sign Up as an Author",
      description: "Create your author profile in just 2 minutes. No upfront costs or technical skills required."
    },
    {
      icon: <Mic className="w-8 h-8" />,
      title: "2. Publish Content",
      description: "Write articles or record podcasts. Our editor makes formatting easy with AI-assisted tools."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "3. Grow Your Audience",
      description: "We promote your content to our existing community while you share with your networks."
    },
    {
      icon: <BarChart2 className="w-8 h-8" />,
      title: "4. Earn Money",
      description: "Get paid through ads, subscriptions, and sponsorships. Higher engagement = higher earnings."
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "5. Get Paid Monthly",
      description: "Receive payments directly to your bank account every month with no payment thresholds."
    }
  ]

  const earningsExamples = [
    { level: "Beginner", posts: "5-10/month", avgEarnings: "$200-$500" },
    { level: "Intermediate", posts: "10-20/month", avgEarnings: "$500-$1,500" },
    { level: "Pro", posts: "20+/month", avgEarnings: "$1,500-$5,000+" }
  ]

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Turn Your Knowledge Into Income
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Our platform makes it easy for anyone to create content and earn money. 
              No prior experience needed - we provide the tools and audience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                Join as Author <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#earnings"
                className="px-8 py-3 border border-gray-300 dark:border-gray-700 font-medium rounded-lg transition-colors"
              >
                See Earnings Potential
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Animated background elements */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-full -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-500 blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-purple-500 blur-3xl"></div>
        </motion.div>
      </section>

      {/* How It Works Steps */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            Simple 5-Step Process
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-900/50 rounded-lg mb-4 text-blue-600 dark:text-blue-400">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Earnings Potential */}
      <section id="earnings" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Real Earnings Potential
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Our top authors earn thousands per month. Here's what you could make based on your output:
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {earningsExamples.map((example, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`p-6 rounded-xl border ${index === 1 ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700'}`}
                >
                  <h3 className={`text-xl font-bold mb-4 ${index === 1 ? 'text-blue-600 dark:text-blue-400' : ''}`}>
                    {example.level}
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Monthly Posts</p>
                      <p className="font-medium">{example.posts}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Avg. Earnings</p>
                      <p className={`text-2xl font-bold ${index === 1 ? 'text-blue-600 dark:text-blue-400' : ''}`}>
                        {example.avgEarnings}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 md:p-8"
            >
              <h3 className="text-xl font-bold mb-4">How We Calculate Earnings</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 flex-shrink-0 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                  </div>
                  <span>Ad revenue based on your content's views and engagement</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 flex-shrink-0 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                  </div>
                  <span>Subscription revenue share from paying members</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 flex-shrink-0 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                  </div>
                  <span>Sponsorship opportunities for top-performing content</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Earning?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of creators who are building their income streams with our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="px-8 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              >
                Get Started Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/faq"
                className="px-8 py-3 border border-white text-white font-medium rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                Have Questions?
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}