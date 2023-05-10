import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url)
  const maxSearchNumber = searchParams.get("maxSearchNumber")
  const searchString = searchParams.get("searchString")

  const apiKey = process.env.YT_KEY;

  const response = await axios.get(
    'https://www.googleapis.com/youtube/v3/search',
    {
      params: {
        part: 'snippet',
        maxResults: maxSearchNumber,
        q: searchString,
        type: 'video',
        key: apiKey,
      },
    }
  );

  const allVidIds = response.data.items.map((eachObj: any) => eachObj.id.videoId);

  return NextResponse.json({allVidIds})

}

