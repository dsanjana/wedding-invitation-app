import WeddingDetails from '@/components/WeddingDetails'
import SaveTheDate from '@/components/SaveTheDate'
import LocationMap from '@/components/LocationMap'
import RSVPForm from '@/components/RSVPForm'
import PhotoGallery from '@/components/PhotoGallery'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <WeddingDetails />
      <SaveTheDate />
      <PhotoGallery />
      <LocationMap />
      <RSVPForm />
      <Footer />
    </main>
  )
}

