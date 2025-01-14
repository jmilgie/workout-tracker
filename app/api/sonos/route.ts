import { NextResponse } from 'next/server';
const { Sonos } = require('sonos');

// Replace with your Sonos speaker IP
const SONOS_IP = '192.168.1.39';
const device = new Sonos(SONOS_IP);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  try {
    switch (action) {
      case 'play':
        await device.play();
        return NextResponse.json({ status: 'playing' });

      case 'pause':
        await device.pause();
        return NextResponse.json({ status: 'paused' });

      case 'workout':
        // Set volume and play a specific Spotify playlist
        await device.setVolume(40);
        await device.playSpotifyUri('spotify:playlist:YOUR_WORKOUT_PLAYLIST_ID');
        return NextResponse.json({ status: 'playing workout music' });

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Sonos error:', error);
    return NextResponse.json({ error: 'Failed to control Sonos' }, { status: 500 });
  }
}
