'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

// Wedding photos
const galleryImages = [
  {
    id: 1,
    src: '/LMX53473.JPG',
    alt: 'Gayathri & Dumindu - Dancing under the archway',
  },
  {
    id: 2,
    src: '/LMX53659.JPG',
    alt: 'Gayathri & Dumindu - Beach embrace',
  },
  {
    id: 3,
    src: '/LMX53275.JPG',
    alt: 'Gayathri & Dumindu - Walking together',
  },
  {
    id: 4,
    src: '/LMX53678.JPG',
    alt: 'Gayathri & Dumindu - Beach walk',
  },
  {
    id: 5,
    src: '/LMX53312.JPG',
    alt: 'Gayathri & Dumindu - At the fence',
  },
  {
    id: 6,
    src: '/LMX53480.JPG',
    alt: 'Gayathri & Dumindu - Walking hand in hand',
  },
]

export default function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const openLightbox = (id: number) => {
    setSelectedImage(id)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return

    const currentIndex = galleryImages.findIndex(
      (img) => img.id === selectedImage
    )
    let newIndex: number

    if (direction === 'next') {
      newIndex = (currentIndex + 1) % galleryImages.length
    } else {
      newIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length
    }

    setSelectedImage(galleryImages[newIndex].id)
  }

  // Keyboard navigation
  useEffect(() => {
    if (selectedImage === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return

      const currentIndex = galleryImages.findIndex(
        (img) => img.id === selectedImage
      )

      if (e.key === 'ArrowLeft') {
        const newIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length
        setSelectedImage(galleryImages[newIndex].id)
      } else if (e.key === 'ArrowRight') {
        const newIndex = (currentIndex + 1) % galleryImages.length
        setSelectedImage(galleryImages[newIndex].id)
      } else if (e.key === 'Escape') {
        setSelectedImage(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedImage])

  // Touch handlers for swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current || selectedImage === null) return

    const distance = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50

    if (distance > minSwipeDistance) {
      // Swipe left - next image
      navigateImage('next')
    } else if (distance < -minSwipeDistance) {
      // Swipe right - previous image
      navigateImage('prev')
    }

    touchStartX.current = null
    touchEndX.current = null
  }

  return (
    <>
      <section
        id="gallery"
        className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-12 bg-ivory-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-charcoal-black mb-4 sm:mb-5 md:mb-6 tracking-tight">
              Our Story
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-stone-grey font-light px-2">
              A glimpse into our journey together
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-7 xl:gap-8">
            {galleryImages.map((image) => (
              <div
                key={image.id}
                onClick={() => openLightbox(image.id)}
                className="relative aspect-square cursor-pointer group overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl shadow-soft hover:shadow-elegant transition-romantic touch-manipulation active:scale-95"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className={`object-cover group-hover:scale-110 transition-romantic ${
                    image.id === 2 ? 'object-top' : 'object-center'
                  }`}
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-black/0 via-charcoal-black/0 to-charcoal-black/0 group-hover:from-charcoal-black/10 group-hover:via-charcoal-black/5 group-hover:to-charcoal-black/0 transition-romantic"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-deep-espresso/98 backdrop-blur-sm flex items-center justify-center p-6 transition-romantic"
          onClick={closeLightbox}
          style={{ animation: 'fadeIn 0.4s ease-in-out' }}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-charcoal-black bg-ivory-white/90 hover:bg-ivory-white transition-romantic z-10 p-2 sm:p-2.5 rounded-full shadow-soft hover:shadow-elegant touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Close lightbox"
          >
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              navigateImage('prev')
            }}
            className="absolute left-4 sm:left-6 text-ivory-white hover:text-champagne-gold transition-romantic z-10 p-2 sm:p-3 rounded-full hover:bg-deep-espresso/50 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Previous image"
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
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              navigateImage('next')
            }}
            className="absolute right-4 sm:right-6 text-ivory-white hover:text-champagne-gold transition-romantic z-10 p-2 sm:p-3 rounded-full hover:bg-deep-espresso/50 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Next image"
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
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div
            className="relative max-w-6xl w-full h-full max-h-[92vh]"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Left clickable area for previous */}
            <div
              className="absolute left-0 top-0 bottom-0 w-1/3 cursor-pointer z-20"
              onClick={(e) => {
                e.stopPropagation()
                navigateImage('prev')
              }}
              aria-label="Previous image"
            ></div>
            
            {/* Right clickable area for next */}
            <div
              className="absolute right-0 top-0 bottom-0 w-1/3 cursor-pointer z-20"
              onClick={(e) => {
                e.stopPropagation()
                navigateImage('next')
              }}
              aria-label="Next image"
            ></div>

            {/* Image container */}
            <div
              className="relative w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={
                  galleryImages.find((img) => img.id === selectedImage)?.src || ''
                }
                alt={
                  galleryImages.find((img) => img.id === selectedImage)?.alt || ''
                }
                fill
                className="object-contain rounded-xl select-none pointer-events-none"
                sizes="90vw"
                draggable={false}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

