"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Calendar, MapPin, BadgeCheck } from "lucide-react";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* ✅ Background Image (sharp but shadowed) */}
      <div className="absolute inset-0 z-10">
        <Image
          src="/cont.png"
          alt="Event background"
          fill
          priority
          className="object-cover object-center"
        />
        {/* ✅ Shadow overlay for text visibility */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* ✅ Main content */}
      <div className="max-w-7xl mx-auto text-left relative z-10 md:pl-20">
        <div
          className={`transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance">
            Welcome to BUBT Event_Radar
          </h1>
        </div>

        <div
          className={`transition-all duration-1000 ease-out delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-xl text-gray-200 mb-8 max-w-2xl text-pretty">
            Centralized Platform For University Events And Announcements
          </p>
        </div>

        <div
          className={`flex flex-col sm:flex-row gap-4 mb-12 transition-all duration-1000 ease-out delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Button
            size="lg"
            className="text-lg px-8 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            asChild
          >
            <Link href="#featured">Explore Events</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 bg-transparent text-white border-white hover:bg-white hover:text-black transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            asChild
          >
            <Link href="/register">Create Account</Link>
          </Button>
        </div>

        {/* ✅ Feature Boxes (same as before) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
          {[
            {
              icon: Calendar,
              title: "Easy Booking",
              description:
                "Book tickets in just a few clicks with our streamlined process",
              delay: "delay-600",
            },
            {
              icon: MapPin,
              title: "Local Events",
              description:
                "Discover events happening right in your neighborhood",
              delay: "delay-700",
            },
            {
              icon: BadgeCheck,
              title: "Quality Events",
              description:
                "Curated selection of high-quality events and experiences",
              delay: "delay-800",
            },
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`flex flex-col items-center md:items-start p-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 transform transition-all duration-1000 ease-out hover:scale-105 hover:shadow-lg hover:-translate-y-2 ${feature.delay} ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                {Icon ? (
                  <Icon className="h-12 w-12 text-primary mb-4 transition-colors duration-300" />
                ) : (
                  <div className="h-12 w-12 bg-secondary rounded-full flex items-center justify-center mb-4 transition-all duration-300 hover:rotate-12">
                    <span className="text-secondary-foreground font-bold text-xl">
                      ★
                    </span>
                  </div>
                )}
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-200 text-pretty">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
