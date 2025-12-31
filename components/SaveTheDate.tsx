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

  // Detect if device is mobile
  const isMobile = () => {
    if (typeof window === 'undefined') return false
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  }

  // Format date for Google Calendar URL (YYYYMMDDTHHmmssZ in UTC)
  const formatDateForGoogleCalendar = (date: Date): string => {
    // Get local time components
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    
    // Convert to UTC offset format (no Z, just the time)
    // Google Calendar will interpret this in the user's timezone
    return `${year}${month}${day}T${hours}${minutes}${seconds}`
  }

  const handleSaveToCalendar = () => {
    if (isMobile()) {
      // Use Google Calendar URL for mobile devices (works on both iOS and Android)
      const startDateStr = formatDateForGoogleCalendar(weddingDate)
      const endDateStr = formatDateForGoogleCalendar(receptionEndTime)
      
      const title = encodeURIComponent(`${coupleNames} Wedding`)
      const details = encodeURIComponent(
        `Join us for our special day at ${fullVenueName}`
      )
      const location = encodeURIComponent(`${fullVenueName}, ${venueAddress}`)
      
      const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDateStr}/${endDateStr}&details=${details}&location=${location}`
      
      // Try to open native calendar app
      window.open(googleCalendarUrl, '_blank')
    } else {
      // Desktop: Download .ics file
      handleDownloadICS()
    }
  }

  const handleDownloadICS = () => {
    const icsContent = generateICS({
      title: `${coupleNames} Wedding`,
      description: `Join us for our special day at ${fullVenueName}`,
      location: `${fullVenueName}, ${venueAddress}`,
      startDate: weddingDate,
      endDate: receptionEndTime,
    })

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'wedding-invitation.ics'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
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

