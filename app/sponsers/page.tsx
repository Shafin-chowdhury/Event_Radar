"use client";

import Image from "next/image";
import { DollarSign, Star, TrendingUp, Users, Target, Award, Heart } from "lucide-react";
import {Header} from "@/components/header";
import {Footer} from "@/components/footer";

export default function SponsorsPage() {
  const sponsorTiers = [
    {
      name: "Platinum Sponsor",
      price: "$2,500",
      icon: Star,
      color: "bg-gray-300",
      benefits: [
        "Logo on all event materials",
        "Keynote speaking opportunity",
        "Premium exhibition space",
        "Social media campaign",
        "VIP networking access",
      ]
    },
    {
      name: "Gold Sponsor", 
      price: "$1,000",
      icon: Award,
      color: "from-yellow-500 to-yellow-600",
      benefits: [
        "Logo on main event page",
        "Dedicated exhibition booth",
        "Social media mentions",
        "Event tickets included",
        "Branded session sponsorship"
      ]
    },
    {
      name: "Silver Sponsor",
      price: "$500", 
      icon: TrendingUp,
      color: "from-gray-400 to-gray-600",
      benefits: [
        "Logo on event website",
        "Standard exhibition space",
        "Social media recognition",
        "Promotional items distribution"
      ]
    }
  ];

  const currentSponsors = [
    { name: "Tech Solutions Ltd.", tier: "Platinum", logo: "/tech-solutions.png" },
    { name: "Food Hub", tier: "Gold", logo: "/food-hub.png" },
    { name: "Book Worms Inc.", tier: "Silver", logo: "/book-worms.png" },
    { name: "Global Consulting", tier: "Platinum", logo: "/global-consulting.png" },
    { name: "Local Bank", tier: "Gold", logo: "/local-bank.png" },
    { name: "Creative Agency", tier: "Silver", logo: "/creative-agency.png" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r bg-chart-2 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-6xl mx-auto px-6 text-center">
            <h1 className="text-5xl font-bold mb-6">Partner With Event_Radar</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join us in shaping the future of education. Become a sponsor and connect with thousands of students, 
              faculty, and alumni through our vibrant campus community.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all">
                Become a Sponsor
              </button>
              <button className="border-2 bg-gray-400 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Current Sponsors */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Valued Partners</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {currentSponsors.map((sponsor, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 flex items-center justify-center h-32 border-2 border-gray-200 hover:border-blue-300 transition-all hover:shadow-lg">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Users className="h-6 w-6 text-chart-2" />
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{sponsor.name}</span>
                    <span className={`text-xs block mt-1 ${
                      sponsor.tier === 'Platinum' ? 'text-blue-600' :
                      sponsor.tier === 'Gold' ? 'text-yellow-600' :
                      'text-gray-500'
                    }`}>
                      {sponsor.tier} Sponsor
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sponsorship Tiers */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Sponsorship Tiers</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Choose the sponsorship level that best fits your organization's goals and budget. 
              All packages include exclusive benefits and recognition.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {sponsorTiers.map((tier, index) => {
                const Icon = tier.icon;
                return (
                  <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
                    <div className={`bg-gradient-to-r ${tier.color} py-6 text-white text-center`}>
                      <Icon className="h-12 w-12 mx-auto mb-2" />
                      <h3 className="text-2xl font-bold">{tier.name}</h3>
                      <p className="text-3xl font-bold mt-2">{tier.price}</p>
                      <p className="text-blue-100">per event</p>
                    </div>
                    
                    <div className="p-6">
                      <ul className="space-y-3">
                        {tier.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-start gap-3">
                            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            </div>
                            <span className="text-gray-700 text-sm">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <button className="w-full mt-6 bg-chart-2 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        Select Plan
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Sponsor With Us?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Reach 10,000+ Students</h3>
                <p className="text-gray-600">Connect with our vibrant student community and future professionals</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Targeted Exposure</h3>
                <p className="text-gray-600">Reach specific demographics and academic disciplines</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Brand Development</h3>
                <p className="text-gray-600">Build your brand as an education supporter and industry leader</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Community Impact</h3>
                <p className="text-gray-600">Support student development and educational initiatives</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r bg-chart-2 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Make an Impact?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our community of sponsors and help us create unforgettable experiences for our students.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all">
                Contact Our Team
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all">
                Download Sponsorship Kit
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}