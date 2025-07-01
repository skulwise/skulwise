import { NextApiRequest, NextApiResponse } from 'next';
import { summarizeNotes, textToSpeech } from '../../utils/openai';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { text, generateAudio = false } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required' });
    }

    // Summarize the notes
    const summarizeResponse = await summarizeNotes(text);

    let audioUrl = null;
    if (generateAudio) {
      try {
        // Generate audio for the summary
        const audioBuffer = await textToSpeech(summarizeResponse.summary);
        
        // Convert ArrayBuffer to Base64 for sending to client
        const audioBase64 = Buffer.from(audioBuffer).toString('base64');
        audioUrl = `data:audio/mp3;base64,${audioBase64}`;
      } catch (audioError) {
        console.error('Audio generation failed:', audioError);
        // Continue without audio if it fails
      }
    }

    return res.status(200).json({
      ...summarizeResponse,
      audioUrl,
    });
  } catch (error) {
    console.error('Summarization error:', error);
    return res.status(500).json({ 
      error: 'Failed to process notes. Please try again.' 
    });
  }
}

// Increase API timeout for OpenAI requests
export const config = {
  api: {
    responseLimit: '50mb', // Support large audio files
  },
};