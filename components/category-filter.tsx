"use client"

import Link from "next/link"
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
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("category-filter")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <div id="category-filter" className="flex flex-wrap justify-center gap-4">
      {categories.map((category, index) => {
        const isActive = currentCategory === category.name || (!currentCategory && category.name === "all")
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
              {Icon && <Icon className="h-5 w-5 transition-transform duration-300 hover:rotate-12" />}
              {category.label}
            </Link>
          </Button>
        )
      })}
    </div>
  )
}
