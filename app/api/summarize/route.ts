import { NextRequest, NextResponse } from 'next/server';
import { summarizeText } from '@/src/utils/openai';

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text content is required' },
        { status: 400 }
      );
    }

    if (text.length > 50000) {
      return NextResponse.json(
        { error: 'Text content is too long (max 50,000 characters)' },
        { status: 400 }
      );
    }

    const result = await summarizeText(text);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in summarize API:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}