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
    <div className="group cursor-pointer h-full flex">
      <Card className="text-white rounded-2xl border border-white/10 bg-gradient-to-br from-[#010101] via-[#090909] to-[#010101] shadow-xl relative backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-white/5 hover:-translate-y-1 w-full max-w-full sm:max-w-[220px] md:max-w-[360px] h-full">

        {/* Subtle background effect */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-white/10 opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
          <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-gradient-to-tr from-white/10 to-transparent blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
          {/* Subtle shine effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
        </div>

        <div className="p-4 sm:p-6 relative z-10 flex flex-col items-center text-center h-full">
          <div className="flex-grow flex flex-col items-center justify-center">
            {/* Icon container - simplified */}
            <div className="relative mb-3 sm:mb-5">
              <div className="p-3 sm:p-5 rounded-full backdrop-blur-lg border border-white/20 bg-gradient-to-br from-black/80 to-black/60 shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:border-white/30">
                <div className="transition-transform duration-300 group-hover:scale-110">
                  {icon}
                </div>
              </div>
            </div>

            <h3 className="mb-2 sm:mb-3 text-lg sm:text-2xl font-bold text-white transition-colors duration-300">
              {title}
            </h3>

            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed sm:leading-relaxed transition-colors duration-300 group-hover:text-gray-300">
              {description}
            </p>
          </div>

          {/* Subtle bottom indicator */}
          <div className="flex-shrink-0 mt-3 sm:mt-5">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full transition-all duration-300 group-hover:w-12 group-hover:via-white/50 mx-auto"></div>
          </div>
        </div>

        {/* Corner accents on hover */}
        <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-white/5 to-transparent rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-white/5 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Card>
    </div>
  );
};

export default Component;
