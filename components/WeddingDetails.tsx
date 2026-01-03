'use client'

export default function WeddingDetails() {
  // Update these with actual wedding details
  const weddingData = {
    coupleNames: {
      name1: 'Gayathri',
      name2: 'Dumindu',
    },
    date: 'Saturday, January 31, 2026',
    ceremonyTime: '10:50 AM',
    receptionTime: '10:50 AM to 4:15 PM',
    venue: {
      hall: 'Azella Hall',
      hotel: 'Sawingir Hills Hotel',
      address: 'No. 215, Cooray Waththa Thalagala, Gonapola',
    },
  }

  return (
    <section
      id="details"
      className="pt-24 sm:pt-28 md:pt-32 lg:pt-40 pb-16 sm:pb-20 md:pb-24 lg:pb-32 px-4 sm:px-6 md:px-8 lg:px-12 bg-ivory-white relative"
      style={{
        backgroundImage: 'url(/header.png)',
        backgroundSize: '70%',
        backgroundPosition: 'center 20%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-ivory-white/70"></div>
      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Couple Names */}
        <div className="mb-12 sm:mb-16 md:mb-20 lg:mb-28">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl text-charcoal-black mb-4 sm:mb-5 md:mb-6 tracking-tight">
            {weddingData.coupleNames.name1}
          </h1>
          <div className="flex items-center justify-center gap-4 sm:gap-5 md:gap-6 mb-4 sm:mb-5 md:mb-6">
            <div className="h-[1px] w-12 sm:w-16 md:w-20 lg:w-24 bg-soft-blush-rose/60"></div>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-soft-blush-rose font-light italic">&</span>
            <div className="h-[1px] w-12 sm:w-16 md:w-20 lg:w-24 bg-soft-blush-rose/60"></div>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl text-charcoal-black tracking-tight">
            {weddingData.coupleNames.name2}
          </h1>
        </div>

        {/* Wedding Date */}
        <div className="mb-12 sm:mb-14 md:mb-16 lg:mb-20">
          <p className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-charcoal-black mb-4 sm:mb-5 md:mb-6 font-medium tracking-tight px-2">
            {weddingData.date}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 md:gap-6 lg:gap-10 text-base sm:text-lg md:text-xl lg:text-2xl text-charcoal-black px-2">
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
              <span className="text-stone-grey font-light text-sm sm:text-base md:text-lg">Poruwa Ceremony:</span>
              <span className="font-medium">{weddingData.ceremonyTime}</span>
            </div>
            <div className="hidden sm:block w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-soft-blush-rose/50"></div>
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
              <span className="text-stone-grey font-light text-sm sm:text-base md:text-lg">Reception:</span>
              <span className="font-medium">{weddingData.receptionTime}</span>
            </div>
          </div>
        </div>

        {/* Venue */}
        <div className="px-2">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-charcoal-black mb-2 tracking-tight">
            {weddingData.venue.hotel}
          </h2>
          <p className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl text-charcoal-black tracking-tight">
            {weddingData.venue.hall}
          </p>
        </div>
      </div>
    </section>
  )
}

