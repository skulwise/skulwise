import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface SummarizeResponse {
  summary: string;
  keyPoints: string[];
  flashcards: Array<{
    question: string;
    answer: string;
  }>;
}

export async function summarizeNotes(text: string): Promise<SummarizeResponse> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an expert at summarizing study notes and creating educational content. 
          Your task is to:
          1. Create a concise summary of the main concepts
          2. Extract 3-5 key points
          3. Generate 5-10 flashcards for study
          
          Return your response in the following JSON format:
          {
            "summary": "Brief summary of the main concepts",
            "keyPoints": ["Point 1", "Point 2", "Point 3"],
            "flashcards": [
              {"question": "Question text", "answer": "Answer text"}
            ]
          }`
        },
        {
          role: "user",
          content: `Please summarize these notes and create study materials:\n\n${text}`
        }
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from OpenAI');
    }

    // Parse the JSON response
    const parsedResponse: SummarizeResponse = JSON.parse(response);
    return parsedResponse;
  } catch (error) {
    console.error('Error summarizing notes:', error);
    throw new Error('Failed to summarize notes');
  }
}

export async function textToSpeech(text: string): Promise<ArrayBuffer> {
  try {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: text,
    });

    return await mp3.arrayBuffer();
  } catch (error) {
    console.error('Error converting text to speech:', error);
    throw new Error('Failed to convert text to speech');
  }
}

export async function speechToText(audioFile: File): Promise<string> {
  try {
    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-1",
    });

    return transcription.text;
  } catch (error) {
    console.error('Error converting speech to text:', error);
    throw new Error('Failed to convert speech to text');
  }
}