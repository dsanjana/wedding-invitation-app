import { NextResponse } from 'next/server'
import { generateICS } from '@/lib/calendar'

export async function GET() {
  const weddingDate = new Date('2026-01-31T10:50:00')
  const receptionEndTime = new Date('2026-01-31T16:15:00')
  const venueHall = 'Azella Hall'
  const venueHotel = 'Sawingir Hills Hotel'
  const venueAddress = 'No. 215, Cooray Waththa Thalagala, Gonapola'
  const coupleNames = 'Gayathri & Dumindu'
  const fullVenueName = `${venueHall}, ${venueHotel}`

  const icsContent = generateICS({
    title: `${coupleNames} Wedding`,
    description: `Join us for our special day at ${fullVenueName}`,
    location: `${fullVenueName}, ${venueAddress}`,
    startDate: weddingDate,
    endDate: receptionEndTime,
  })

  return new NextResponse(icsContent, {
    headers: {
      'Content-Type': 'text/calendar;charset=utf-8',
      'Content-Disposition': 'attachment; filename="wedding-invitation.ics"',
    },
  })
}

