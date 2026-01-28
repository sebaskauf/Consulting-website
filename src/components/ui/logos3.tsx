"use client";

import AutoScroll from "embla-carousel-auto-scroll";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface Logo {
  id: string;
  description: string;
  image: string;
  className?: string;
}

interface Logos3Props {
  heading?: string;
  logos?: Logo[];
  className?: string;
}

const Logos3 = ({
  heading = "Trusted by these companies",
  logos = [
    {
      id: "logo-1",
      description: "CODA Marketing",
      image: "/logos/coda-logo.png",
      className: "h-12 w-auto",
    },
    {
      id: "logo-2",
      description: "WMCS Healthcare",
      image: "/logos/wmcs-logo.png",
      className: "h-10 w-auto",
    },
    {
      id: "logo-3",
      description: "DML Fußbodenheizung",
      image: "/logos/dml-logo.png",
      className: "h-8 w-auto",
    },
    {
      id: "logo-4",
      description: "CODA Marketing",
      image: "/logos/coda-logo.png",
      className: "h-12 w-auto",
    },
    {
      id: "logo-5",
      description: "WMCS Healthcare",
      image: "/logos/wmcs-logo.png",
      className: "h-10 w-auto",
    },
    {
      id: "logo-6",
      description: "DML Fußbodenheizung",
      image: "/logos/dml-logo.png",
      className: "h-8 w-auto",
    },
  ],
}: Logos3Props) => {
  return (
    <section className="py-6 sm:py-8 pointer-events-none">
      <div className="flex flex-col items-center text-center mb-2">
        <h3 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider px-4">
          {heading}
        </h3>
      </div>
      <div className="pt-3 sm:pt-4">
        <div className="relative mx-auto flex items-center justify-center lg:max-w-5xl">
          <Carousel
            opts={{ loop: true }}
            plugins={[AutoScroll({ playOnInit: true, speed: 1 })]}
          >
            <CarouselContent className="ml-0">
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className="flex basis-1/3 sm:basis-1/3 md:basis-1/3 lg:basis-1/3 justify-center pl-0"
                >
                  <div className="mx-8 sm:mx-12 md:mx-16 flex shrink-0 items-center justify-center">
                    <div>
                      <img
                        src={logo.image}
                        alt={logo.description}
                        className="h-14 sm:h-16 md:h-20 w-auto"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="absolute inset-y-0 left-0 w-8 sm:w-12 bg-gradient-to-r from-black to-transparent"></div>
          <div className="absolute inset-y-0 right-0 w-8 sm:w-12 bg-gradient-to-l from-black to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export { Logos3 };
