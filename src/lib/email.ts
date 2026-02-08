import { Resend } from 'resend';

// Default sender configuration
export const defaultFrom = {
  name: 'Skaile AI',
  email: 'support@skaile.de',
};

export const replyTo = 'sebastian@skaile.ai';

// Send email helper
interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({ to, subject, html, text }: SendEmailOptions) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured. Please add it to .env.local');
  }

  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from: `${defaultFrom.name} <${defaultFrom.email}>`,
      replyTo: replyTo,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''),
    });

    if (error) {
      console.error('Email send failed:', error.message || 'Unknown error');
      throw new Error(error.message || 'Unknown Resend error');
    }

    return data;
  } catch (err) {
    console.error('Email send error:', err instanceof Error ? err.message : 'Unknown error');
    throw err;
  }
}
