# Wedding Invitation Web Application

A modern, elegant wedding invitation web application built with Next.js, Tailwind CSS, and Firebase Firestore.

## Features

- ✨ **Wedding Details Section** - Display couple names, date, times, venue, and dress code
- 📅 **Save The Date** - Generate and download `.ics` calendar files
- 📍 **Location & Google Maps** - Embedded map with directions
- 💌 **RSVP System** - Collect RSVPs with Firebase Firestore
- 📸 **Photo Gallery** - Responsive image grid with lightbox modal
- 🎨 **Elegant Design** - Custom wedding color palette with smooth animations

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Firebase Firestore**
- **Framer Motion** (for animations)

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Firebase project with Firestore enabled
- Google Maps API key (optional, for map embedding)

### Installation

1. **Clone the repository and install dependencies:**

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. **Set up environment variables:**

Create a `.env.local` file in the root directory:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here

# Google Maps API Key (optional)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

3. **Set up Firebase Firestore:**

- Go to [Firebase Console](https://console.firebase.google.com/)
- Create a new project or use an existing one
- Enable Firestore Database
- Create a collection named `rsvps` (it will be created automatically when the first RSVP is submitted)
- Copy your Firebase configuration values to `.env.local`

4. **Customize wedding details:**

Update the following files with your actual wedding information:

- `components/WeddingDetails.tsx` - Couple names, date, times, venue, dress code
- `components/SaveTheDate.tsx` - Wedding date and venue details
- `components/LocationMap.tsx` - Venue address and coordinates
- `components/PhotoGallery.tsx` - Replace placeholder images with your photos

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles
├── components/
│   ├── Navigation.tsx      # Fixed navigation bar
│   ├── WeddingDetails.tsx # Wedding information section
│   ├── SaveTheDate.tsx    # Calendar download component
│   ├── PhotoGallery.tsx   # Image gallery with lightbox
│   ├── LocationMap.tsx    # Google Maps integration
│   └── RSVPForm.tsx       # RSVP form component
├── lib/
│   ├── firebase.ts        # Firebase configuration
│   └── calendar.ts        # ICS file generator
└── public/                # Static assets
```

## Customization

### Updating Wedding Details

Edit `components/WeddingDetails.tsx`:

```typescript
const weddingData = {
  coupleNames: {
    name1: 'Your Name',
    name2: 'Partner Name',
  },
  date: 'Saturday, June 15, 2024',
  ceremonyTime: '4:00 PM',
  receptionTime: '6:00 PM',
  venue: {
    name: 'Venue Name',
    address: '123 Address, City, State ZIP',
  },
  dressCode: 'Semi-Formal',
}
```

### Adding Photos

Replace the placeholder images in `components/PhotoGallery.tsx`:

```typescript
const galleryImages = [
  {
    id: 1,
    src: '/images/photo1.jpg', // Use local images
    alt: 'Description',
  },
  // ... more images
]
```

Or use Cloudinary URLs:

```typescript
src: 'https://res.cloudinary.com/your-cloud/image/upload/photo1.jpg'
```

### Updating Colors

Colors are defined in `tailwind.config.ts`. The wedding palette includes:

- **Primary**: Ivory White, Charcoal Black, Soft Blush Rose
- **Secondary**: Sage Green, Warm Sand, Stone Grey
- **Actions**: Champagne Gold, Deep Gold, Success, Error

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add your environment variables in Vercel's project settings
4. Deploy!

Vercel will automatically detect Next.js and configure the build settings.

### Environment Variables on Vercel

Make sure to add all your environment variables in the Vercel dashboard:
- Go to your project → Settings → Environment Variables
- Add all variables from `.env.local`

## Firebase Firestore Structure

The RSVP data is stored in a collection called `rsvps` with the following structure:

```typescript
{
  fullName: string
  email?: string
  numberOfGuests: number
  attendance: 'yes' | 'no'
  message?: string
  createdAt: Timestamp
}
```

## Features in Detail

### Calendar Integration

The "Save The Date" feature generates a standard `.ics` file that can be imported into:
- Google Calendar
- Apple Calendar
- Outlook
- Any calendar application that supports ICS format

### Google Maps

The location section includes:
- Embedded Google Maps (requires API key)
- "Open in Google Maps" button for directions
- Responsive map display

### RSVP System

- Form validation
- Real-time submission to Firestore
- Success/error feedback
- Guest count tracking (stored in Firestore)

## Design System

The application uses a carefully curated wedding color palette:

- **Background**: Ivory White (#FAF9F7)
- **Text**: Charcoal Black (#2B2B2B)
- **Accents**: Soft Blush Rose (#E8C4C4), Sage Green (#A8B5A2)
- **CTAs**: Champagne Gold (#C9A24D)
- **Typography**: Playfair Display (headings), Inter (body)

## Support

For issues or questions, please open an issue on GitHub.

## License

This project is open source and available for personal use.

---

Built with ❤️ for your special day
