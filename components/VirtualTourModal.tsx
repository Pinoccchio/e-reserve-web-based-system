import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react'

interface Hotspot {
  x: number
  y: number
  title: string
  description: string
}

interface TourImage {
  src: string
  hotspots: Hotspot[]
  info: string
}

interface VirtualTourModalProps {
  isOpen: boolean
  onClose: () => void
  facilityName: string
  images: TourImage[]
}

export function VirtualTourModal({ isOpen, onClose, facilityName, images }: VirtualTourModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        prevImage()
      } else if (event.key === 'ArrowRight') {
        nextImage()
      } else if (event.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isFullscreen])

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    setActiveHotspot(null)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
    setActiveHotspot(null)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const handleClose = () => {
    setActiveHotspot(null)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className={`max-w-[95vw] w-full ${isFullscreen ? 'h-screen max-h-screen p-0' : 'max-h-[90vh]'} overflow-hidden`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <DialogHeader className="mb-2 md:mb-4 relative">
            <div className="flex justify-between items-start">
              <div>
                <DialogTitle>{facilityName}</DialogTitle>
                <DialogDescription className="hidden md:block">
                  Explore the facility and click on hotspots to learn more
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {/* Main Content */}
          <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
            {/* Image Section */}
            <div className="relative md:w-3/4 h-[40vh] md:h-[60vh] md:max-h-[600px]">
              <img
                src={images[currentImageIndex].src || "/placeholder.svg"}
                alt={`${facilityName} virtual tour image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover rounded-md"
              />
              {images[currentImageIndex].hotspots.map((hotspot, index) => (
                <Button
                  key={index}
                  className="absolute w-6 h-6 p-0 rounded-full bg-blue-500 hover:bg-blue-600 transition-transform transform hover:scale-110"
                  style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                  onClick={() => setActiveHotspot(hotspot)}
                  aria-label={`Hotspot: ${hotspot.title}`}
                />
              ))}
              <div className="absolute top-4 left-4 flex space-x-2">
                <Button variant="outline" size="icon" onClick={prevImage} className="rounded-full bg-white/80 hover:bg-white">
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous image</span>
                </Button>
                <Button variant="outline" size="icon" onClick={nextImage} className="rounded-full bg-white/80 hover:bg-white">
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next image</span>
                </Button>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={toggleFullscreen}
                className="absolute top-4 right-4 rounded-full bg-white/80 hover:bg-white"
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                <span className="sr-only">{isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}</span>
              </Button>
            </div>

            {/* Info Section */}
            <div className="md:w-1/4 md:ml-4 mt-4 md:mt-0 flex flex-col min-h-0">
              <Tabs defaultValue="info" className="flex flex-col h-full">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="info">Info</TabsTrigger>
                  <TabsTrigger value="hotspots">Hotspots</TabsTrigger>
                  <TabsTrigger value="map">Map</TabsTrigger>
                </TabsList>
                <div className="flex-1 overflow-y-auto mt-2">
                  <TabsContent value="info" className="border rounded-md p-4 m-0">
                    <h3 className="font-semibold mb-2">Facility Information</h3>
                    <p className="text-sm">{images[currentImageIndex].info}</p>
                  </TabsContent>
                  <TabsContent value="hotspots" className="border rounded-md p-4 m-0">
                    <h3 className="font-semibold mb-2">Hotspots</h3>
                    {images[currentImageIndex].hotspots.length > 0 ? (
                      <ul className="space-y-2">
                        {images[currentImageIndex].hotspots.map((hotspot, index) => (
                          <li key={index} className="cursor-pointer hover:bg-gray-100 p-2 rounded" onClick={() => setActiveHotspot(hotspot)}>
                            <h4 className="font-medium text-sm">{hotspot.title}</h4>
                            <p className="text-xs text-gray-600">{hotspot.description}</p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm">No hotspots available for this image.</p>
                    )}
                  </TabsContent>
                  <TabsContent value="map" className="border rounded-md p-4 m-0">
                    <h3 className="font-semibold mb-2">Mini-map</h3>
                    <div className="relative w-full h-32 bg-gray-200 rounded-md overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                        Facility Layout
                      </div>
                      <div
                        className="absolute w-4 h-4 bg-blue-500 rounded-full"
                        style={{ left: `${(currentImageIndex / (images.length - 1)) * 100}%`, top: '50%', transform: 'translateY(-50%)' }}
                      />
                    </div>
                    <p className="mt-2 text-xs text-gray-600">
                      Current position: Image {currentImageIndex + 1} of {images.length}
                    </p>
                  </TabsContent>
                </div>
              </Tabs>

              {/* Thumbnails */}
              <div className="mt-4">
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      className={`w-16 h-12 flex-shrink-0 rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        index === currentImageIndex ? 'ring-2 ring-blue-500' : ''
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img src={image.src || "/placeholder.svg"} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Hotspot Info Overlay */}
          {activeHotspot && (
            <div className="absolute bottom-4 left-4 right-4 p-4 bg-black/70 text-white rounded-md">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-sm">{activeHotspot.title}</h3>
                  <p className="text-sm">{activeHotspot.description}</p>
                </div>
                <div 
                  className="cursor-pointer p-1 hover:bg-white/10 rounded-full"
                  onClick={() => setActiveHotspot(null)}
                >
                  <span className="sr-only">Close hotspot info</span>
                  ×
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}