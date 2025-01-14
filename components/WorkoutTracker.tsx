import React, { useState, useEffect } from 'react';
import { Card, Tab, Tabs, Alert, Button, Container, Accordion } from 'react-bootstrap';
import { Upload, RefreshCw, Check, X } from 'lucide-react';
import VideoCarousel from './VideoCarousel';

interface Exercise {
  name: string;
  sets?: number;
  reps?: number;
  repsPerLeg?: number;
  duration?: string;
  equipment?: string | string[];
  partner?: string;
}

interface Block {
  name: string;
  type?: string;
  exercises: Exercise[];
  notes?: string;
}

interface Part {
  name: string;
  duration: string;
  rounds?: number;
  work?: string;
  rest?: string;
  intensity?: string;
}

interface Option {
  name: string;
  structure?: Part[];
}

interface DayData {
  name: string;
  type?: string;
  notes?: string[] | string;
  blocks?: Block[];
  options?: Option[];
}

interface WeekData {
  title: string;
  focus: string;
  notes?: {
    main: string[];
  };
  days: {
    [key: string]: DayData;
  };
}

interface WorkoutData {
  programTitle: string;
  weeks: {
    [key: string]: WeekData;
  };
}

const WorkoutTracker: React.FC = () => {
  const [activeWeek, setActiveWeek] = useState<string>('1');
  const [completedExercises, setCompletedExercises] = useState<{ [key: string]: boolean }>({});
  const [workoutData, setWorkoutData] = useState<WorkoutData | null>(null);
  const [error, setError] = useState<string | null>(null);
  interface Video {
  title: string;
  link: string;
  thumbnail: string;
}

const [videoLinks, setVideoLinks] = useState<Video[]>([]);

  useEffect(() => {
    const loadWorkoutData = async () => {
      try {
        const response = await fetch('/workout.json');
        const data: WorkoutData = await response.json();
        setWorkoutData(data);
      } catch (err) {
        setError('Error loading workout data');
        console.error('Error loading workout data:', err);
      }
    };

    const loadVideoLinks = async () => {
      try {
        const response = await fetch('/workoutvideos.json');
        const data = await response.json();
        if (Array.isArray(data)) {
          setVideoLinks(data);
        } else {
          throw new Error('Invalid video data format');
        }
      } catch (err) {
        console.error('Error loading video data:', err);
      }
    };

    loadWorkoutData();
    loadVideoLinks();
  }, []);

  const normalizeString = (str: string) =>
    str?.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .trim();

  const filterVideos = (exercise: Exercise): { primaryVideos: Video[]; relatedVideos: Video[]; } => {
    if (!exercise || !videoLinks.length) return { primaryVideos: [], relatedVideos: [] };

    const exerciseKeywords = normalizeString(exercise.name).split(/\s+/);
    const normalizedEquipment = Array.isArray(exercise.equipment)
      ? exercise.equipment.map(normalizeString)
      : [normalizeString(exercise.equipment || '')];

    const matchesBoth = (videoTitle: string) =>
      exerciseKeywords.every((keyword) => videoTitle.includes(keyword)) &&
      normalizedEquipment.some((eq) => eq && videoTitle.includes(eq));

    const matchesEither = (videoTitle: string) =>
      exerciseKeywords.some((keyword) => videoTitle.includes(keyword)) ||
      normalizedEquipment.some((eq) => eq && videoTitle.includes(eq));

    const primaryVideos = videoLinks.filter((video) => {
      const normalizedTitle = normalizeString(video.title);
      return matchesBoth(normalizedTitle);
    });

    const relatedVideos = videoLinks.filter((video) => {
      const normalizedTitle = normalizeString(video.title);
      return matchesEither(normalizedTitle) && !primaryVideos.includes(video);
    });

    return { primaryVideos, relatedVideos };
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const json: WorkoutData = JSON.parse(text);

      if (!json.weeks || !json.programTitle) {
        throw new Error('Invalid workout plan format');
      }

      setWorkoutData(json);
      setError(null);
      setCompletedExercises({});
    } catch (err) {
      setError('Error loading workout plan. Please check the file format.');
      console.error('Error loading file:', err);
    }
  };

  const resetToDefault = async () => {
    try {
      const response = await fetch('/workout.json');
      const data: WorkoutData = await response.json();
      setWorkoutData(data);
      setCompletedExercises({});
      setError(null);
    } catch (err) {
      setError('Error loading default workout data');
      console.error('Error resetting to default:', err);
    }
  };

  const toggleExercise = (weekNum: string, day: string, blockIndex: number, exerciseIndex: number) => {
    const key = `${weekNum}-${day}-${blockIndex}-${exerciseIndex}`;
    setCompletedExercises((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const formatExerciseText = (exercise: Exercise): string => {
    const details: string[] = [];
    if (exercise.sets) details.push(`${exercise.sets} sets`);
    if (exercise.reps) details.push(`${exercise.reps} reps`);
    if (exercise.repsPerLeg) details.push(`${exercise.repsPerLeg} reps per leg`);
    if (exercise.duration) details.push(exercise.duration);
    if (exercise.equipment) {
      const eq = Array.isArray(exercise.equipment) ? exercise.equipment.join('/') : exercise.equipment;
      details.push(`(${eq})`);
    }

    return `${exercise.partner ? `Partner ${exercise.partner}: ` : ''}${exercise.name} ${
      details.length ? details.join(', ') : ''
    }`;
  };

  if (!workoutData) {
    return (
      <Container className="py-4">
        <Card>
          <Card.Body>Loading workout data...</Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Card className="mb-4">
        <Card.Header className="bg-light">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="h4 mb-0">{workoutData.programTitle}</h2>
            <div className="d-flex gap-2">
              <Button variant="primary" className="d-flex align-items-center gap-2">
                <Upload size={16} />
                <label className="mb-0" style={{ cursor: 'pointer' }}>
                  Upload Plan
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="d-none"
                  />
                </label>
              </Button>
              <Button
                variant="secondary"
                onClick={resetToDefault}
                className="d-flex align-items-center gap-2"
              >
                <RefreshCw size={16} />
                Reset
              </Button>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          {error && (
            <Alert variant="danger" className="mb-4">
              {error}
            </Alert>
          )}

          <Tabs
            activeKey={activeWeek}
            onSelect={(k) => k && setActiveWeek(k)}
            className="mb-4"
          >
            {Object.entries(workoutData.weeks).map(([week, weekData]) => (
              <Tab key={week} eventKey={week} title={`Week ${week}`}>
                <div className="mt-4">
                  <h3 className="h5 mb-3">
                    {weekData.title} - Focus: {weekData.focus}
                  </h3>

                  {weekData.notes?.main && (
                    <Alert variant="info" className="mb-4">
                      <h4 className="h6">Week Notes:</h4>
                      <ul className="mb-0">
                        {weekData.notes.main.map((note, idx) => (
                          <li key={idx}>{note}</li>
                        ))}
                      </ul>
                    </Alert>
                  )}

                  <Accordion>
                    {Object.entries(weekData.days || {}).map(([day, dayData]) => (
                      <Accordion.Item key={day} eventKey={day}>
                        <Accordion.Header>
                          <div>
                            <div className="text-capitalize">{day}</div>
                            <small className="text-muted">
                              {dayData.name} {dayData.type && `(${dayData.type})`}
                            </small>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body>
                          {dayData.notes && (
                            <Alert variant="secondary" className="mb-3">
                              <h5 className="h6">Notes:</h5>
                              <ul className="mb-0">
                                {Array.isArray(dayData.notes) ? (
                                  dayData.notes.map((note, idx) => <li key={idx}>{note}</li>)
                                ) : (
                                  <li>{dayData.notes}</li>
                                )}
                              </ul>
                            </Alert>
                          )}

                          {dayData.blocks?.map((block, blockIndex) => (
                            <div key={blockIndex} className="mb-4">
                              <h5 className="h6 mb-3">
                                {block.name} {block.type && `(${block.type})`}
                              </h5>
                              <div>
                                {block.exercises.map((exercise, exerciseIndex) => {
                                  const exerciseKey = `${week}-${day}-${blockIndex}-${exerciseIndex}`;
                                  const isCompleted = completedExercises[exerciseKey];
                                  const { primaryVideos, relatedVideos } = filterVideos(exercise);

                                  return (
                                    <div key={exerciseIndex} className="mb-3">
                                      <div
                                        className="d-flex align-items-center gap-2 p-2 bg-light rounded cursor-pointer"
                                        onClick={() => toggleExercise(week, day, blockIndex, exerciseIndex)}
                                      >
                                        {isCompleted ? (
                                          <Check className="text-success" size={20} />
                                        ) : (
                                          <X className="text-muted" size={20} />
                                        )}
                                        <span className={isCompleted ? 'text-muted text-decoration-line-through' : ''}>
                                          {formatExerciseText(exercise)}
                                        </span>
                                      </div>
                                      {!isCompleted && (primaryVideos.length > 0 || relatedVideos.length > 0) && (
                                        <div className="ps-4 mt-2">
                                          <VideoCarousel
                                            primaryVideos={primaryVideos}
                                            relatedVideos={relatedVideos}
                                          />
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                              {block.notes && (
                                <small className="text-muted fst-italic">Note: {block.notes}</small>
                              )}
                            </div>
                          ))}

                          {dayData.options?.map((option, optionIndex) => (
                            <div key={optionIndex} className="mb-4">
                              <h5 className="h6 mb-2">{option.name}</h5>
                              <div className="ps-3">
                                {option.structure?.map((part, partIndex) => (
                                  <div key={partIndex}>
                                    • {part.name}: {part.duration}
                                    {part.rounds && ` (${part.rounds} rounds: ${part.work}/${part.rest})`}
                                    {part.intensity && ` - ${part.intensity}`}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </div>
              </Tab>
            ))}
          </Tabs>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default WorkoutTracker;