'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/ui/navbar';

const Beams = dynamic(() => import('@/components/ui/Beams'), { ssr: false });
const AIReadinessQuiz = dynamic(
  () => import('@/components/AIReadinessQuiz').then((mod) => mod.AIReadinessQuiz),
  { ssr: false }
);

function QuizContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') as 'schnell_check' | 'detaillierte_analyse' | null;

  return (
    <AIReadinessQuiz
      initialMode={mode}
    />
  );
}

export default function QuizPage() {
  return (
    <main className="min-h-screen bg-black relative overflow-x-hidden">
      {/* Navigation Bar */}
      <Navbar />

      {/* Background - Beams */}
      <div className="fixed inset-0 z-0 opacity-50 mix-blend-lighten pointer-events-none">
        <Beams
          lightColor="#A0F0FF"
          beamWidth={2.5}
          beamHeight={18}
          beamNumber={12}
          speed={2}
          noiseIntensity={1.5}
          scale={0.12}
          rotation={43}
        />
      </div>

      {/* Gradient overlay for better readability */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.85) 100%)',
        }}
      />

      {/* Quiz Content - Compact, no footer for one-pager */}
      <div className="relative z-10 pt-20 md:pt-24 min-h-screen flex flex-col">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="w-8 h-8 border-2 border-[#A0F0FF]/30 border-t-[#A0F0FF] rounded-full animate-spin" />
            </div>
          }
        >
          <QuizContent />
        </Suspense>
      </div>
    </main>
  );
}
