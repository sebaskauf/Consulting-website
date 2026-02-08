import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendEmail } from '@/lib/email';
import {
  generateQuizResultEmail,
  generateQuizResultPlainText,
} from '@/emails/quiz-result-template';
import { SCORE_LEVELS } from '@/components/AIReadinessQuiz/types';

// Zod schema for request validation
const sendEmailSchema = z.object({
  leadData: z.object({
    firstName: z.string().min(1, 'Vorname ist erforderlich'),
    email: z.string().email('Ungültige E-Mail-Adresse'),
    company: z.string().optional(),
    phone: z.string().optional(),
    wantsEmailResult: z.boolean(),
    acceptedPrivacy: z.boolean(),
  }),
  results: z.object({
    totalPercentage: z.number().min(0).max(100),
    scoreLevel: z.enum([
      'bereit',
      'fast_startklar',
      'auf_gutem_weg',
      'erst_grundlagen',
      'anfang_reise',
    ]),
    categoryScores: z.array(
      z.object({
        label: z.string(),
        percentage: z.number(),
      })
    ),
  }),
  geminiAnalysis: z
    .object({
      summary: z.string(),
      strengths: z.array(z.string()),
      improvements: z.array(z.string()),
      nextSteps: z.array(z.string()),
    })
    .nullable()
    .optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate with Zod
    const validationResult = sendEmailSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validierungsfehler',
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const { leadData, results, geminiAnalysis } = validationResult.data;

    // Check if user wants email
    if (!leadData.wantsEmailResult) {
      return NextResponse.json({
        success: true,
        skipped: true,
        message: 'E-Mail-Versand übersprungen (nicht gewünscht)',
      });
    }

    // Get score level info
    const scoreLevelInfo = SCORE_LEVELS.find(
      (level) => level.level === results.scoreLevel
    );

    if (!scoreLevelInfo) {
      return NextResponse.json(
        { success: false, error: 'Ungültiges Score-Level' },
        { status: 400 }
      );
    }

    // Cal.com URL for booking
    const calendlyUrl = 'https://cal.com/sebastian-kauffmann/30min';

    // Generate email content
    const htmlContent = generateQuizResultEmail({
      firstName: leadData.firstName,
      totalPercentage: results.totalPercentage,
      scoreLevel: {
        title: scoreLevelInfo.title,
        emoji: scoreLevelInfo.emoji,
        description: scoreLevelInfo.description,
        ctaText: scoreLevelInfo.ctaText,
      },
      categoryScores: results.categoryScores,
      geminiAnalysis: geminiAnalysis || null,
      calendlyUrl,
    });

    const textContent = generateQuizResultPlainText({
      firstName: leadData.firstName,
      totalPercentage: results.totalPercentage,
      scoreLevel: {
        title: scoreLevelInfo.title,
        emoji: scoreLevelInfo.emoji,
        description: scoreLevelInfo.description,
        ctaText: scoreLevelInfo.ctaText,
      },
      categoryScores: results.categoryScores,
      geminiAnalysis: geminiAnalysis || null,
      calendlyUrl,
    });

    // Generate subject line
    const subject = `Dein AI-Readiness Ergebnis: ${results.totalPercentage}% - ${scoreLevelInfo.title}`;

    // Send email via Resend
    const data = await sendEmail({
      to: leadData.email,
      subject,
      html: htmlContent,
      text: textContent,
    });

    // Email sent - no PII in logs

    return NextResponse.json({
      success: true,
      messageId: data?.id,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'E-Mail konnte nicht gesendet werden';
    console.error('Email send failed:', errorMessage);

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
