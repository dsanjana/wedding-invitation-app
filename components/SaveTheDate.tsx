'use client'

import { generateICS } from '@/lib/calendar'

export default function SaveTheDate() {
  const weddingDate = new Date('2026-01-31T10:50:00') // Poruwa Ceremony time
  const receptionEndTime = new Date('2026-01-31T16:15:00') // Reception end time
  const venueHall = 'Azella Hall'
  const venueHotel = 'Sawingir Hills Hotel'
  const venueAddress = 'No. 215, Cooray Waththa Thalagala, Gonapola'
  const coupleNames = 'Gayathri & Dumindu'
  const fullVenueName = `${venueHall}, ${venueHotel}`

  // Detect if device is iOS
  const isIOS = () => {
    if (typeof window === 'undefined') return false
    return /iPhone|iPad|iPod/i.test(navigator.userAgent)
  }

  // Detect if device is mobile
  const isMobile = () => {
    if (typeof window === 'undefined') return false
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  }

  const handleSaveToCalendar = () => {
    const icsContent = generateICS({
      title: `${coupleNames} Wedding`,
      description: `Join us for our special day at ${fullVenueName}`,
      location: `${fullVenueName}, ${venueAddress}`,
      startDate: weddingDate,
      endDate: receptionEndTime,
    })

    // Create blob with ICS content
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)

    if (isIOS()) {
      // For iOS: Open blob URL in new window to trigger calendar app
      // iOS Safari will recognize the calendar MIME type and open Calendar app
      const newWindow = window.open(url, '_blank')
      
      // If popup was blocked, fall back to link click
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        const link = document.createElement('a')
        link.href = url
        link.target = '_blank'
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
      
      // Clean up after longer delay for iOS
      setTimeout(() => {
        URL.revokeObjectURL(url)
      }, 2000)
    } else {
      // For Android and Desktop: Use download attribute
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'wedding-invitation.ics')
      
      // Append to body, click, then remove
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Clean up the blob URL after a short delay
      setTimeout(() => {
        URL.revokeObjectURL(url)
      }, 100)
    }
  }

  return (
    <section
      id="save-the-date"
      className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-12 bg-warm-sand/20"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-charcoal-black mb-6 sm:mb-8 md:mb-10 tracking-tight">
          Save The Date
        </h2>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-stone-grey mb-8 sm:mb-10 md:mb-12 lg:mb-16 max-w-2xl mx-auto font-light leading-relaxed px-2">
          We would be honored to have you celebrate this special day with us.
          Please save the date to your calendar.
        </p>
        <button
          onClick={handleSaveToCalendar}
          className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-10 py-4 sm:py-4.5 md:py-5 bg-champagne-gold text-white rounded-xl sm:rounded-2xl shadow-romantic hover:bg-deep-gold transition-romantic hover:shadow-elegant transform hover:-translate-y-1 sm:hover:-translate-y-1.5 hover:scale-[1.02] active:scale-[0.98] touch-manipulation min-h-[48px]"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="font-medium text-sm sm:text-base tracking-wide">Add to Calendar</span>
        </button>
      </div>
    </section>
  )
}

