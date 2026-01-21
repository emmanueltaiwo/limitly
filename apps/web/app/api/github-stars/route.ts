import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      'https://api.github.com/repos/emmanueltaiwo/limitly',
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub data');
    }

    const data = await response.json();
    return NextResponse.json({ stars: data.stargazers_count || 0 });
  } catch (error) {
    console.error('Error fetching GitHub stars:', error);
    return NextResponse.json({ stars: 0 }, { status: 500 });
  }
}
