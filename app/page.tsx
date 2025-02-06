import Link from 'next/link'
import { Calendar, MapPin, Clock, Users } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const featuredVenues = [
  { id: 1, name: "Grand Ballroom", capacity: 500, location: "City Center" },
  { id: 2, name: "Garden Pavilion", capacity: 200, location: "Botanical Gardens" },
  { id: 3, name: "Conference Hall", capacity: 300, location: "Business District" },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
            Find Your Perfect Venue
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover and reserve the ideal space for your next event with E-Reserve. 
            From intimate gatherings to grand celebrations, we've got you covered.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/venues">Explore Venues</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuredVenues.map((venue) => (
            <Card key={venue.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <CardHeader className="p-0">
                <img 
                  src={`https://source.unsplash.com/random/400x200?venue=${venue.id}`} 
                  alt={venue.name}
                  className="w-full h-48 object-cover"
                />
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-xl mb-2">{venue.name}</CardTitle>
                <CardDescription className="text-gray-600">
                  <div className="flex items-center mb-2">
                    <Users className="w-4 h-4 mr-2" />
                    Capacity: {venue.capacity}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {venue.location}
                  </div>
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/venues/${venue.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose E-Reserve?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
              <p className="text-gray-600">Simple and intuitive reservation process for any type of event.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-green-100 p-3 rounded-full mb-4">
                <MapPin className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Diverse Locations</h3>
              <p className="text-gray-600">Wide range of venues to suit every need and preference.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-purple-100 p-3 rounded-full mb-4">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock assistance for all your reservation needs.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

