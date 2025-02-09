"use client"

import { useState } from "react"
import { Search, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { VirtualTourModal } from "@/components/VirtualTourModal"
import Image from "next/image"

// Sample data for facilities with real Unsplash images and hotspots
const facilities = [
  {
    id: 1,
    name: "Grand Ballroom",
    capacity: 500,
    type: "Indoor",
    pricePerHour: 1000,
    description:
      "Our luxurious Grand Ballroom is perfect for large-scale events, weddings, and conferences. It features state-of-the-art audiovisual equipment and customizable lighting.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
        hotspots: [
          { x: 20, y: 30, title: "Stage", description: "A spacious stage for performances or presentations" },
          { x: 80, y: 70, title: "Seating Area", description: "Elegant seating arrangements for up to 500 guests" },
        ],
        info: "The Grand Ballroom features a grand entrance, high ceilings, and crystal chandeliers. It can be divided into smaller sections for more intimate events.",
      },
      {
        src: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
        hotspots: [
          {
            x: 50,
            y: 50,
            title: "Dance Floor",
            description: "A large dance floor perfect for social events and celebrations",
          },
        ],
        info: "The central area features a spacious dance floor with special lighting effects. Surrounding the dance floor are elegant dining tables and a bar area.",
      },
      {
        src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
        hotspots: [
          { x: 30, y: 40, title: "Catering Area", description: "Dedicated space for catering and refreshments" },
        ],
        info: "Our in-house catering team can provide a wide range of menu options. The catering area is equipped with warming stations and refrigeration units to ensure food quality.",
      },
    ],
  },
  {
    id: 2,
    name: "Garden Pavilion",
    capacity: 200,
    type: "Outdoor",
    pricePerHour: 750,
    description:
      "Our charming Garden Pavilion offers a beautiful outdoor setting for weddings, parties, and corporate events. It features lush landscaping and a covered area.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
        hotspots: [
          {
            x: 40,
            y: 60,
            title: "Pavilion",
            description: "Covered area for events, protecting guests from sun and light rain",
          },
          {
            x: 70,
            y: 30,
            title: "Garden Area",
            description: "Beautiful landscaped gardens perfect for photos and mingling",
          },
        ],
        info: "The Garden Pavilion offers a perfect blend of natural beauty and event functionality. The covered pavilion area can accommodate up to 200 guests.",
      },
      {
        src: "https://images.unsplash.com/photo-1603903631918-a6a92fb6ac49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
        hotspots: [
          {
            x: 50,
            y: 50,
            title: "Seating Area",
            description: "Flexible seating arrangements to suit various event types",
          },
        ],
        info: "The seating area can be configured in various ways to suit different event types, from formal dinners to casual cocktail parties.",
      },
      {
        src: "https://images.unsplash.com/photo-1544473244-f6895e69ad8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
        hotspots: [
          { x: 60, y: 40, title: "Bar Area", description: "Outdoor bar for serving refreshments and cocktails" },
        ],
        info: "The Garden Pavilion includes a fully equipped outdoor bar area, perfect for serving drinks and light refreshments to your guests.",
      },
    ],
  },
  {
    id: 3,
    name: "Conference Hall",
    capacity: 100,
    type: "Indoor",
    pricePerHour: 500,
    description:
      "Our modern Conference Hall is ideal for business meetings, seminars, and workshops. It's equipped with the latest technology for presentations and video conferencing.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
        hotspots: [
          {
            x: 30,
            y: 50,
            title: "Presentation Screen",
            description: "Large screen for presentations and video conferencing",
          },
          { x: 70, y: 60, title: "Seating Area", description: "Comfortable seating for up to 100 attendees" },
        ],
        info: "The Conference Hall features a state-of-the-art presentation system with a large screen and high-quality audio equipment.",
      },
      {
        src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
        hotspots: [
          { x: 40, y: 40, title: "Breakout Area", description: "Space for small group discussions or networking" },
        ],
        info: "Adjacent to the main conference room is a breakout area perfect for small group discussions, networking, or coffee breaks.",
      },
      {
        src: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
        hotspots: [{ x: 50, y: 50, title: "Tech Hub", description: "Central control for all audiovisual equipment" }],
        info: "Our Conference Hall includes a dedicated tech hub for easy control of all audiovisual equipment, ensuring smooth presentations and video conferences.",
      },
    ],
  },
  {
    id: 4,
    name: "Sports Complex",
    capacity: 1000,
    type: "Indoor",
    pricePerHour: 1500,
    description:
      "Our state-of-the-art Sports Complex is perfect for various sporting events, tournaments, and fitness activities. It features multiple courts and a large spectator area.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
        hotspots: [],
        info: "",
      },
      {
        src: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
        hotspots: [],
        info: "",
      },
      {
        src: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
        hotspots: [],
        info: "",
      },
    ],
  },
  {
    id: 5,
    name: "Amphitheater",
    capacity: 300,
    type: "Outdoor",
    pricePerHour: 800,
    description:
      "Our stunning Amphitheater provides a unique outdoor venue for concerts, performances, and ceremonies. It features tiered seating and a spacious stage area.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
        hotspots: [],
        info: "",
      },
      {
        src: "https://images.unsplash.com/photo-1603228254119-e6a4d095dc59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
        hotspots: [],
        info: "",
      },
      {
        src: "https://images.unsplash.com/photo-1587162146766-e06b1189b907?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
        hotspots: [],
        info: "",
      },
    ],
  },
  {
    id: 6,
    name: "Exhibition Center",
    capacity: 2000,
    type: "Indoor",
    pricePerHour: 2000,
    description:
      "Our spacious Exhibition Center is perfect for trade shows, conventions, and large-scale exhibitions. It features ample space for booths and displays.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1600783486189-553f6a73f6f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
        hotspots: [],
        info: "",
      },
      {
        src: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
        hotspots: [],
        info: "",
      },
      {
        src: "https://images.unsplash.com/photo-1575029644286-efb9039cac46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
        hotspots: [],
        info: "",
      },
    ],
  },
]

export default function FacilitiesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [virtualTourFacility, setVirtualTourFacility] = useState<(typeof facilities)[0] | null>(null)

  const filteredFacilities = facilities.filter(
    (facility) =>
      facility.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType === "all" || facility.type === filterType),
  )

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 px-4 sm:px-6 rounded-lg shadow-xl">
        <h1 className="text-2xl md:text-4xl font-extrabold mb-4">Explore Our Facilities</h1>
        <p className="text-lg md:text-xl mb-6">Find the perfect space for your next event</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Search facilities..."
              className="w-full pl-10 bg-white text-gray-900"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full sm:w-[180px] bg-white text-gray-900">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Indoor">Indoor</SelectItem>
              <SelectItem value="Outdoor">Outdoor</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFacilities.map((facility) => (
          <Card key={facility.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
            <CardHeader className="p-0">
              <Image
                src={facility.images[0].src || "/placeholder.svg"}
                alt={facility.name}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <CardTitle className="text-xl mb-2">{facility.name}</CardTitle>
              <div className="space-y-1">
                <p className="text-sm text-gray-600">Capacity: {facility.capacity}</p>
                <p className="text-sm text-gray-600">Type: {facility.type}</p>
                <p className="text-sm text-gray-600">Price: ₱{facility.pricePerHour}/hour</p>
              </div>
              <p className="text-sm text-gray-700 mt-4 line-clamp-3">{facility.description}</p>
            </CardContent>
            <CardFooter className="p-4 flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                className="flex items-center justify-center w-full sm:w-auto"
                onClick={() => setVirtualTourFacility(facility)}
              >
                <Eye className="mr-2 h-4 w-4" /> Virtual Tour
              </Button>
              <Button className="w-full sm:w-auto">Book Now</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredFacilities.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-600">No facilities found</h2>
          <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {virtualTourFacility && (
        <VirtualTourModal
          isOpen={!!virtualTourFacility}
          onClose={() => setVirtualTourFacility(null)}
          facilityName={virtualTourFacility.name}
          images={virtualTourFacility.images}
        />
      )}
    </div>
  )
}

