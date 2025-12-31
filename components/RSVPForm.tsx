'use client'

import { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function RSVPForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    numberOfGuests: 1,
    attendance: 'yes' as 'yes' | 'no',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>(
    'idle'
  )

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'numberOfGuests' ? parseInt(value) || 1 : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      await addDoc(collection(db, 'rsvps'), {
        ...formData,
        createdAt: serverTimestamp(),
      })

      setSubmitStatus('success')
      setFormData({
        fullName: '',
        email: '',
        numberOfGuests: 1,
        attendance: 'yes',
        message: '',
      })
    } catch (error) {
      console.error('Error submitting RSVP:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="rsvp"
      className="pt-16 sm:pt-20 md:pt-24 lg:pt-32 pb-0 px-4 sm:px-6 md:px-8 lg:px-12 bg-warm-sand/20 overflow-hidden"
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-charcoal-black mb-4 sm:mb-5 md:mb-6 tracking-tight">
            RSVP
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-stone-grey font-light px-2">
            Please let us know if you'll be able to join us
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-ivory-white rounded-2xl sm:rounded-3xl shadow-elegant p-6 sm:p-8 md:p-10 lg:p-14 xl:p-16 border border-warm-sand/40"
        >
          <div className="space-y-5 sm:space-y-6 md:space-y-8">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm sm:text-base font-medium text-charcoal-black mb-2 sm:mb-3 tracking-wide"
              >
                Full Name <span className="text-error">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base border border-warm-sand/60 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-champagne-gold/50 focus:border-champagne-gold/50 bg-white text-charcoal-black transition-romantic placeholder:text-stone-grey/50 touch-manipulation"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm sm:text-base font-medium text-charcoal-black mb-2 sm:mb-3 tracking-wide"
              >
                Email (Optional)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base border border-warm-sand/60 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-champagne-gold/50 focus:border-champagne-gold/50 bg-white text-charcoal-black transition-romantic placeholder:text-stone-grey/50 touch-manipulation"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Number of Guests */}
            <div>
              <label
                htmlFor="numberOfGuests"
                className="block text-sm sm:text-base font-medium text-charcoal-black mb-2 sm:mb-3 tracking-wide"
              >
                Number of Guests <span className="text-error">*</span>
              </label>
              <select
                id="numberOfGuests"
                name="numberOfGuests"
                required
                value={formData.numberOfGuests}
                onChange={handleChange}
                className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base border border-warm-sand/60 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-champagne-gold/50 focus:border-champagne-gold/50 bg-white text-charcoal-black transition-romantic appearance-none cursor-pointer touch-manipulation"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>

            {/* Attendance */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-charcoal-black mb-3 sm:mb-4 tracking-wide">
                Will you be attending? <span className="text-error">*</span>
              </label>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <label className="flex-1 cursor-pointer touch-manipulation">
                  <input
                    type="radio"
                    name="attendance"
                    value="yes"
                    checked={formData.attendance === 'yes'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className={`px-4 sm:px-6 py-3.5 sm:py-4 md:py-5 rounded-lg sm:rounded-xl text-center border-2 transition-romantic text-sm sm:text-base ${
                      formData.attendance === 'yes'
                        ? 'border-success bg-success/10 text-success shadow-soft'
                        : 'border-warm-sand/60 bg-white text-charcoal-black active:border-sage-green/60 active:bg-sage-green/5'
                    }`}
                  >
                    <span className="font-medium">Yes, I'll be there!</span>
                  </div>
                </label>
                <label className="flex-1 cursor-pointer touch-manipulation">
                  <input
                    type="radio"
                    name="attendance"
                    value="no"
                    checked={formData.attendance === 'no'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className={`px-4 sm:px-6 py-3.5 sm:py-4 md:py-5 rounded-lg sm:rounded-xl text-center border-2 transition-romantic text-sm sm:text-base ${
                      formData.attendance === 'no'
                        ? 'border-error bg-error/10 text-error shadow-soft'
                        : 'border-warm-sand/60 bg-white text-charcoal-black active:border-soft-blush-rose/60 active:bg-soft-blush-rose/5'
                    }`}
                  >
                    <span className="font-medium">Sorry, can't make it</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm sm:text-base font-medium text-charcoal-black mb-2 sm:mb-3 tracking-wide"
              >
                Message for the Couple (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base border border-warm-sand/60 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-champagne-gold/50 focus:border-champagne-gold/50 bg-white text-charcoal-black resize-none transition-romantic placeholder:text-stone-grey/50 touch-manipulation"
                placeholder="Share your well wishes..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 sm:px-8 md:px-10 py-4 sm:py-4.5 md:py-5 bg-champagne-gold text-white rounded-xl sm:rounded-2xl shadow-romantic hover:bg-deep-gold transition-romantic hover:shadow-elegant transform hover:-translate-y-1 sm:hover:-translate-y-1.5 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none font-medium text-sm sm:text-base tracking-wide touch-manipulation min-h-[48px]"
            >
              {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
            </button>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="p-4 sm:p-5 bg-success/10 border-2 border-success/30 rounded-lg sm:rounded-xl text-success text-center transition-romantic">
                <p className="font-medium text-sm sm:text-base">Thank you! Your RSVP has been submitted successfully.</p>
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="p-4 sm:p-5 bg-error/10 border-2 border-error/30 rounded-lg sm:rounded-xl text-error text-center transition-romantic">
                <p className="font-medium text-sm sm:text-base">There was an error submitting your RSVP. Please try again.</p>
              </div>
            )}
          </div>
        </form>
      </div>
      
      {/* Decorative Footer Border */}
      <div className="mt-10 sm:mt-12 md:mt-16 lg:mt-20 relative left-1/2 -translate-x-1/2 w-screen">
        <div 
          className="w-full h-12 sm:h-14 md:h-16 lg:h-20 bg-cover bg-repeat-x opacity-80"
          style={{
            backgroundImage: 'url(/footer_.png)',
            backgroundSize: 'auto 100%',
            backgroundPosition: 'center',
          }}
        ></div>
      </div>
    </section>
  )
}

