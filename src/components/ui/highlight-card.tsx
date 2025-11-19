"use client";

import { FC, ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface ComponentProps {
  title: string;
  description: string;
  icon?: ReactNode;
}

const Component: FC<ComponentProps> = ({ title, description, icon }) => {
  return (
    <div className="group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-rotate-1 h-full flex">
      <style jsx>{`
        @keyframes ping-slow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.1);
            opacity: 0;
          }
        }
        .animate-ping-slow {
          animation: ping-slow 4s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
      <Card className="text-white rounded-2xl border border-white/10 bg-gradient-to-br from-[#010101] via-[#090909] to-[#010101] shadow-2xl relative backdrop-blur-xl overflow-hidden hover:border-white/25 hover:shadow-white/5 hover:shadow-3xl w-full max-w-full sm:max-w-[220px] md:max-w-[360px] h-full">


        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-white/10 opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
          <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-gradient-to-tr from-white/10 to-transparent blur-3xl opacity-30 group-hover:opacity-50 transform group-hover:scale-110 transition-all duration-700 animate-bounce"></div>
          <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-white/5 blur-xl animate-ping"></div>
          <div className="absolute bottom-16 right-16 w-12 h-12 rounded-full bg-white/5 blur-lg animate-ping"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
        </div>


        <div className="p-4 sm:p-6 relative z-10 flex flex-col items-center text-center h-full">
          <div className="flex-grow flex flex-col items-center justify-center">
            <div className="relative mb-3 sm:mb-5">
              <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping-slow"></div>
              <div className="absolute inset-0 rounded-full border border-white/10 animate-pulse"></div>

              <div className="p-3 sm:p-5 rounded-full backdrop-blur-lg border border-white/20 bg-gradient-to-br from-black/80 to-black/60 shadow-2xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 hover:shadow-white/20">
                <div className="transform group-hover:rotate-180 transition-transform duration-700">
                  {icon}
                </div>
              </div>
            </div>

            <h3 className="mb-2 sm:mb-3 text-lg sm:text-2xl font-bold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent animate-pulse transform group-hover:scale-105 transition-transform duration-300">
              {title}
            </h3>

            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed sm:leading-relaxed transform group-hover:text-gray-200 transition-colors duration-300">
              {description}
            </p>
          </div>

          <div className="flex-shrink-0 mt-3 sm:mt-5">
            <div className="w-1/3 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent rounded-full transform group-hover:w-1/2 group-hover:h-1 transition-all duration-500 animate-pulse mx-auto"></div>

            <div className="flex space-x-1.5 sm:space-x-2 mt-2 sm:mt-3 opacity-60 group-hover:opacity-100 transition-opacity duration-300 justify-center">
              <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full animate-bounce"></div>
              <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
              <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            </div>
          </div>
        </div>


        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-white/10 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </Card>
    </div>
  );
};

export default Component;
