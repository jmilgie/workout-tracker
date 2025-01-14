import { NextApiRequest, NextApiResponse } from 'next';
import { Sonos } from 'sonos';

// Replace with the IP of your Sonos speaker
const SONOS_IP = '192.168.1.39';
const device = new Sonos(SONOS_IP);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { action } = req.query;

  try {
    switch (action) {
      case 'play':
        await device.play();
        return res.status(200).json({ status: 'playing' });

      case 'pause':
        await device.pause();
        return res.status(200).json({ status: 'paused' });

      case 'workout':
        await device.setVolume(40); // Set volume
        await device.playSpotifyUri('spotify:playlist:37i9dQZF1DWXRqgorJj26U'); // Workout playlist
        return res.status(200).json({ status: 'playing workout music' });

      default:
        return res.status(400).json({ error: 'Invalid action' });
    }
  } catch (error) {
    console.error('Sonos error:', error);
    return res.status(500).json({ error: 'Failed to control Sonos' });
  }
}
