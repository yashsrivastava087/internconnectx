import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'

const categories = [
  "Front-end Developer",
  "Back-end Developer",
  "Data Analyst",
  "UI/UX Designer",
  "Software Developer",
  "Data Scientist",
  "Full-stack developer"
]

const Catcarousel = () => {
  return (
    <div className="my-20">
      <Carousel className="w-full max-w-4xl mx-auto">
        <CarouselContent className="gap-4">
          {categories.map((cat, index) => (
            <CarouselItem 
              className="flex justify-center md:basis-1/2 lg:basis-[30%]"
            >
              <Button 
                variant="outline" 
                className="rounded-full bg-gray-800 text-white px-6 py-3 min-w-[180px] hover:bg-gray-700 transition-colors"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div>
          <CarouselPrevious className="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600 transition-colors" />
        </div>
        <div>
          <CarouselNext className="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600 transition-colors" />
        </div>
      </Carousel>
    </div>
  )
}

export default Catcarousel
