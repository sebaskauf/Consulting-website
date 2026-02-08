import { LeadFormData, QuizResults, GeminiAnalysis } from './types';

interface SendEmailParams {
  leadData: LeadFormData;
  results: QuizResults;
  geminiAnalysis?: GeminiAnalysis | null;
}

interface SendEmailResponse {
  success: boolean;
  messageId?: string;
  skipped?: boolean;
  error?: string;
}

/**
 * Send quiz results via email to the user
 * This calls the API route which sends the email via SMTP
 */
export async function sendQuizResultEmail({
  leadData,
  results,
  geminiAnalysis,
}: SendEmailParams): Promise<SendEmailResponse> {
  // Don't send if user doesn't want email
  if (!leadData.wantsEmailResult) {
    return { success: true, skipped: true };
  }

  try {
    const requestBody = {
      leadData: {
        firstName: leadData.firstName,
        email: leadData.email,
        company: leadData.company,
        phone: leadData.phone,
        wantsEmailResult: leadData.wantsEmailResult,
        acceptedPrivacy: leadData.acceptedPrivacy,
      },
      results: {
        totalPercentage: results.totalPercentage,
        scoreLevel: results.scoreLevel,
        categoryScores: results.categoryScores
          .filter((cs) => cs.maxScore > 0)
          .map((cs) => ({
            label: cs.label,
            percentage: cs.percentage,
          })),
      },
      geminiAnalysis:
        geminiAnalysis && !geminiAnalysis.isLoading && !geminiAnalysis.error
          ? {
              summary: geminiAnalysis.summary,
              strengths: geminiAnalysis.strengths,
              improvements: geminiAnalysis.improvements,
              nextSteps: geminiAnalysis.nextSteps,
            }
          : null,
    };

    const response = await fetch('/api/quiz/send-results', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      return {
        success: false,
        error: data.error || 'E-Mail konnte nicht gesendet werden',
      };
    }

    const data: SendEmailResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Email request failed:', error instanceof Error ? error.message : 'Unknown error');
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unbekannter Fehler',
    };
  }
}
