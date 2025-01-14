import React from 'react';

const SonosControlButton: React.FC = () => {
  const handleSonosAction = async (action: string) => {
    try {
      // Perform a GET request to the API route with the action as a query parameter
      const response = await fetch(`/api/sonos?action=${action}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to control Sonos');
      }

      const result = await response.json();
      console.log(result.status); // Optionally display the status in your UI
    } catch (error) {
      console.error('Error controlling Sonos:', error);
    }
  };

  return (
    <div className="d-flex gap-2">
      <button onClick={() => handleSonosAction('play')}>Play</button>
      <button onClick={() => handleSonosAction('pause')}>Pause</button>
      <button onClick={() => handleSonosAction('workout')}>Workout</button>
    </div>
  );
};

export default SonosControlButton;