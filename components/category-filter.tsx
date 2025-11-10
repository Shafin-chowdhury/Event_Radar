"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "./ui/button"
import { Music, Laptop, Trophy, Briefcase, Palette, UtensilsCrossed } from "lucide-react"
import { useEffect, useState } from "react"

const categories = [
  { name: "all", label: "All Events", icon: null },
  { name: "music", label: "Music", icon: Music },
  { name: "tech", label: "Technology", icon: Laptop },
  { name: "sports", label: "Sports", icon: Trophy },
  { name: "business", label: "Business", icon: Briefcase },
  { name: "art", label: "Art", icon: Palette },
  { name: "food", label: "Food", icon: UtensilsCrossed },
]

interface CategoryFilterProps {
  currentCategory?: string
}

export function CategoryFilter({ currentCategory }: CategoryFilterProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    const element = document.getElementById("category-filter")
    if (element) observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative w-full h-[50vh]  flex items-center justify-center overflow-hidden">
      <Image
        src="/banner.png"
        alt="Event Banner"
        fill
        className="object-cover object-top"
        priority
      />

      <div
        id="category-filter"
        className="absolute z-10 flex flex-col items-center justify-center bg text-center text-black px-4"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">
          Browse by Category
        </h2>
        <p className="text-lg md:text-xl mb-6 drop-shadow-md">
          Find events that match your interest
        </p>

       
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category, index) => {
            const isActive =
              currentCategory === category.name || (!currentCategory && category.name === "all")
            const Icon = category.icon

            return (
              <Button
                key={category.name}
                variant={isActive ? "default" : "outline"}
                size="lg"
                asChild
                className={`flex items-center gap-2 transition-all duration-500 hover:scale-105 hover:shadow-lg transform ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                } ${isActive ? "animate-pulse" : ""}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Link href={category.name === "all" ? "/" : `/?category=${category.name}`}>
                  {Icon && (
                    <Icon className="h-5 w-5 transition-transform duration-300 hover:rotate-12" />
                  )}
                  {category.label}
                </Link>
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
