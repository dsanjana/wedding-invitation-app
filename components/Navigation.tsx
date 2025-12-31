'use client'

import { useState, useEffect } from 'react'

const navItems = [
  { id: 'details', label: 'Details' },
  { id: 'save-the-date', label: 'Save The Date' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'location', label: 'Location' },
  { id: 'rsvp', label: 'RSVP' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-gentle ${
        isScrolled
          ? 'bg-ivory-white/98 backdrop-blur-md shadow-soft border-b border-warm-sand/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16 sm:h-20 md:h-24">
          <button
            onClick={() => scrollToSection('details')}
            className="font-heading text-lg sm:text-xl md:text-2xl lg:text-3xl text-charcoal-black hover:text-champagne-gold transition-romantic tracking-tight"
          >
            Wedding Invitation
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-stone-grey hover:text-champagne-gold transition-romantic font-medium text-[15px] tracking-wide relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-champagne-gold transition-romantic group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-charcoal-black hover:text-champagne-gold transition-romantic p-2 -mr-2 touch-manipulation"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-1 animate-in slide-in-from-top">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-4 py-2.5 text-stone-grey hover:text-champagne-gold hover:bg-warm-sand/40 rounded-xl transition-romantic font-medium touch-manipulation active:bg-warm-sand/50"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

