import { main } from '@/scripts/seed';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    main();
    return new NextResponse('Seed data successfully', { status: 201 });
  } catch (error) {
    console.log('[ERROR_SEED_DATA]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
