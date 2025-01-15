# Workout Tracker

This project is a React application designed to help users track their workout routines, including exercises, sets, reps, and accompanying video resources. The application supports customizable workout plans, including week-by-week structures, daily exercises, and video tutorials.

## Features

- **Workout Data Management**:
  - Load workout data from a JSON file.
  - Upload custom workout plans.
  - Reset to default workout plan.

- **Exercise Tracking**:
  - Mark exercises as completed.
  - View exercise details (e.g., sets, reps, equipment).
  - Filter and view videos related to exercises.

- **Week and Day Organization**:
  - Navigate through weeks and days of a workout plan.
  - Display weekly focus and notes.
  - Access day-specific blocks and exercises.

- **Video Integration**:
  - Filter videos based on exercise names and equipment.
  - Display primary and related video tutorials.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jmilgie/workout-tracker/workout-tracker.git
   ```

2. Navigate to the project directory:
   ```bash
   cd workout-tracker
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

   The application will be available at `http://localhost:3000`.

## File Structure

- **`src/components/WorkoutTracker.tsx`**: Main component for the workout tracker.
- **`src/components/VideoCarousel.tsx`**: Displays video carousels for exercises.
- **`public/workout.json`**: Default workout data.
- **`public/workoutvideos.json`**: Video data linked to exercises.

## Usage

1. **Upload a Workout Plan**:
   - Click on the "Upload Plan" button.
   - Select a `.json` file with the workout plan structure.

2. **Reset to Default Plan**:
   - Click the "Reset" button to load the default workout plan.

3. **Track Exercises**:
   - Navigate through weeks and days using the tabs.
   - Mark exercises as completed by clicking the check or cross button.

4. **View Exercise Details**:
   - View exercise sets, reps, equipment, and duration.
   - Watch primary and related video tutorials.

## JSON File Structure

### Workout Plan (`workout.json`)
```json
{
  "programTitle": "Sample Workout Program",
  "weeks": {
    "1": {
      "title": "Week 1",
      "focus": "Strength",
      "notes": { "main": ["Focus on form."] },
      "days": {
        "monday": {
          "name": "Day 1",
          "blocks": [
            {
              "name": "Block 1",
              "exercises": [
                {
                  "name": "Squat",
                  "sets": 3,
                  "reps": 10,
                  "equipment": "Barbell"
                }
              ]
            }
          ]
        }
      }
    }
  }
}
```

### Video Links (`workoutvideos.json`)
```json
[
  {
    "title": "How to Squat with a Barbell",
    "link": "https://example.com/video1",
    "thumbnail": "https://example.com/thumbnail1.jpg"
  }
]
```

## Dependencies

- **React**: UI library.
- **React Bootstrap**: Styling and layout.
- **Lucide-React**: Icons.

## Development Notes

- The application uses environment variables to determine base URLs for fetching JSON files. Ensure the `NODE_ENV` is set appropriately (`development` or `production`).

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.