"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Users, Target } from "lucide-react";
import {Header} from "@/components/header";
import {Footer} from "@/components/footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      details: "hello@eventradar.com",
      description: "Send us an email anytime"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+880 1817 647434",
      description: "Mon to Fri, 9am to 5pm"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "Mirpur-2, Dhaka, Bangladesh",
      description: "Come say hello at our campus"
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: "9:00 AM - 5:00 PM",
      description: "Saturday to Thursday"
    }
  ];

  const teamMembers = [
    {
      role: "Event Coordinator",
      name: "Sarah Johnson",
      email: "sarah@eventradar.com"
    },
    {
      role: "Sponsorship Manager", 
      name: "Mike Chen",
      email: "mike@eventradar.com"
    },
    {
      role: "Technical Support",
      name: "Alex Rodriguez",
      email: "alex@eventradar.com"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow">
   
       

       
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Contact Information */}
              <div className="lg:col-span-1">
                <h2 className="text-3xl font-bold text-chart-2 mb-8">Contact Information</h2>
                <p className="text-gray-600 mb-8">
                  Reach out to us through any of these channels. We're here to help you with event management, 
                  sponsorship opportunities, and any questions about BUBT Event Radar.
                </p>

                <div className="space-y-6">
                  {contactMethods.map((method, index) => {
                    const Icon = method.icon;
                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="h-6 w-6 text-chart-2" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{method.title}</h3>
                          <p className="text-gray-700 font-medium">{method.details}</p>
                          <p className="text-gray-500 text-sm">{method.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Team Contacts */}
                <div className="mt-12">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Direct Contacts</h3>
                  <div className="space-y-4">
                    {teamMembers.map((member, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <h4 className="font-semibold text-gray-800">{member.name}</h4>
                        <p className="text-blue-600 text-sm">{member.role}</p>
                        <p className="text-gray-600 text-sm">{member.email}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-chart-2 mb-2">Send us a Message</h2>
                  <p className="text-gray-600 mb-8">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="What is this regarding?"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
                        placeholder="Tell us how we can help you..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-chart-2 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Send className="h-5 w-5" />
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-2">How do I list an event on BUBT Event Radar?</h3>
                <p className="text-gray-600">
                  Simply contact our event coordination team through this form or email us directly. We'll guide you through the event submission process.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-2">What sponsorship opportunities are available?</h3>
                <p className="text-gray-600">
                  We offer various sponsorship tiers for different events. Contact our sponsorship manager to discuss customized partnership opportunities.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-2">How can students get involved?</h3>
                <p className="text-gray-600">
                  Students can participate in events, join event organizing committees, or volunteer. Reach out to learn about current opportunities.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-2">What's your response time for inquiries?</h3>
                <p className="text-gray-600">
                  We typically respond within 24 hours during business days. For urgent matters, please call us directly.
                </p>
              </div>
            </div>
          </div>
        </section>
        </main>
      <Footer />
    </div>
  );
}