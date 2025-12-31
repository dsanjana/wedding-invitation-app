'use client'

export default function LocationMap() {
  // Update with actual venue address
  const venueAddress = 'No. 215, Cooray Waththa Thalagala, Gonapola'
  const venueHall = 'Azella Hall'
  const venueHotel = 'Sawingir Hills Hotel'

  const openInGoogleMaps = () => {
    const url = 'https://maps.app.goo.gl/wXDm1SRGuqnnXhPS8'
    window.open(url, '_blank')
  }

  return (
    <section
      id="location"
      className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-12 bg-ivory-white"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-charcoal-black mb-4 sm:mb-5 md:mb-6 tracking-tight">
            Location
          </h2>
          <p className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-charcoal-black mb-2 tracking-tight px-2">
            {venueHotel}
          </p>
          <p className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl text-charcoal-black mb-2 sm:mb-3 tracking-tight px-2">
            {venueHall}
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-stone-grey font-light mb-6 sm:mb-8 md:mb-10 px-2 leading-relaxed">{venueAddress}</p>
        </div>

        <div className="text-center">
          <button
            onClick={openInGoogleMaps}
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
              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-medium text-sm sm:text-base tracking-wide">Open in Google Maps</span>
          </button>
        </div>
      </div>
    </section>
  )
}

