"use client";

import Image from "next/image";
import { Users, Target, Zap, Facebook, Twitter, Linkedin, Instagram, MessageCircle } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Logo from "@/public/logob.png";
import png1 from "@/public/location.png"
import  TargetP  from "@/public/target.png";

export default function AboutPage() {
  const primaryTextColor = "text-blue-600";
  const accentBgColor = "bg-blue-600/90";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header />

      <main className="flex-grow">
<section className="py-20 bg-white">
  <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
    <div className="space-y-6 md:pr-6">
      <h1 className="text-5xl font-extrabold text-gray-800 flex items-center gap-4">
        <Image src={Logo} alt="BUBT Event Radar Logo" width={100} height={100} className="rounded-full" />
        <span className="text-chart-2">BUBT Event_Radar</span>
      </h1>

      <p className="text-lg text-gray-600 leading-relaxed">
        <strong>BUBT Event_Radar</strong> is your all-in-one university event management and discovery
        platform, designed to bring students, teachers, and alumni closer together. Whether it’s academic
        seminars, cultural events, or club activities — everything is now just a click away.
      </p>

      <p className="text-gray-600 leading-relaxed">
        We aim to simplify event organization and participation for everyone in the BUBT community, promoting
        better communication, collaboration, and engagement.
      </p>

      <p className="text-gray-600 leading-relaxed">
        The BUBT Event Hub serves as the vital digital nucleus for the entire university community, centralizing
        all essential information regarding official activities, workshops, seminars, and cultural programs. My
        involvement with this platform aims to streamline event communication, ensuring every student and faculty
        member remains fully informed about upcoming opportunities and logistical details. This resource is
        crucial for promoting transparency, maximizing campus engagement, and fostering a truly vibrant,
        connected BUBT experience. It’s where the campus comes together.
      </p>

      {/* Social Media Icons */}
      <div className="flex gap-5 mt-8">
        <a href="#" className="hover:scale-110 transition transform">
          <Facebook className="text-chart-2 w-7 h-7 hover:text-blue-700" />
        </a>
        <a href="#" className="hover:scale-110 transition transform">
          <Twitter className="text-chart-2 w-7 h-7 hover:text-blue-500" />
        </a>
        <a href="#" className="hover:scale-110 transition transform">
          <Linkedin className="text-chart-2 w-7 h-7 hover:text-blue-800" />
        </a>
        <a href="#" className="hover:scale-110 transition transform">
          <Instagram className="text-chart-2 w-7 h-7 hover:text-pink-700" />
        </a>
        <a href="#" className="hover:scale-110 transition transform">
          <MessageCircle className="text-chart-2 w-7 h-7 hover:text-green-700" />
        </a>
      </div>
    </div>

    {/* Right Side - 4 Images in Grid */}
    {/* <div className="grid grid-cols-2 gap-5 justify-center items-center">
      <Image
        src="/ab.png"
        alt="Event Image 1"
        width={700}
        height={900}
        className=" shadow-2xl object-cover hover:scale-105 transition-transform duration-300"
      />
      <Image
        src= {png1}
        alt="Event Image 2"
        width={400}
        height={300}
        className="rounded-2xl shadow-2xl object-cover hover:scale-105 transition-transform duration-300"
      />
      <Image
        src={TargetP}
        alt="Event Image 3"
        width={400}
        height={300}
        className="rounded-2xl shadow-2xl object-cover hover:scale-105 transition-transform duration-300"
      />
     
    </div> */}

    {/* Right Side - Highlighted Big Image with Smaller Ones */}
<div className="grid grid-cols-2 gap-5 justify-center items-center">
  {/* Big main image (ab.png) - spans both columns */}
  <div className="col-span-2">
    <Image
      src="/ab.png"
      alt="Event Image 1"
      width={900}
      height={600}
      className="rounded-3xl shadow-2xl object-cover hover:scale-105 transition-transform duration-300 w-full h-auto"
    />
  </div>

  {/* Smaller supporting images */}
  <Image
    src={png1}
    alt="Event Image 2"
    width={400}
    height={300}
    className="rounded-2xl shadow-2xl object-cover hover:scale-105 transition-transform duration-300"
  />
  <Image
    src={TargetP}
    alt="Event Image 3"
    width={400}
    height={300}
    className="rounded-2xl shadow-2xl object-cover hover:scale-105 transition-transform duration-300"
  />
</div>

  </div>
</section>

        <section className="py-20 px-4 bg-white">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-chart-2 p-8 rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <Target className="h-10 w-10 text-white mb-4" />
              <h2 className="text-2xl font-bold text-white mb-3">Our Mission</h2>
              <p className="text-white text-sm">
                To provide a centralized, easy-to-use platform that aggregates all university events, announcements, and
                cultural activities, ensuring no student misses out.
              </p>
            </div>

            <div className="bg-chart-2 p-8 rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <Users className= "h-10 w-10 text-white mb-4" />
              <h2 className="text-2xl font-bold text-white mb-3">Our Vision</h2>
              <p className="text-white text-sm">
                To become the essential hub for BUBT community engagement, fostering a vibrant, active, and
                well-informed campus life for students, faculty, and alumni.
              </p>
            </div>

            <div className="bg-chart-2 p-8 rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <Zap className= "h-10 w-10 text-white mb-4" />
              <h2 className="text-2xl font-bold text-white mb-3">Why We Built It</h2>
              <p className="text-white text-sm">
                We saw the need for a unified system to replace fragmented communication, making event organization
                efficient and discovery effortless for everyone involved.
              </p>
            </div>
          </div>
        </section>

        
        <section className="bg-gray-100 py-20 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-chart-2 mb-6">Our Impact</h2>
            <div className="flex justify-around items-center flex-wrap gap-8">
              <div className="text-center">
                <p className="text-5xl font-extrabold text-chart-2">50+</p>
                <p className="text-gray-600 mt-1">Events Listed Monthly</p>
              </div>
              <div className="text-center">
                <p className="text-5xl font-extrabold text-chart-2">5k+</p>
                <p className="text-gray-600 mt-1">Active Users</p>
              </div>
              <div className="text-center">
                <p className="text-5xl font-extrabold text-chart-2">99%</p>
                <p className="text-gray-600 mt-1">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
