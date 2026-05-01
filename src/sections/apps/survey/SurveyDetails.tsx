import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  Button,
  FormControl,
  FormLabel,
  FormGroup
} from '@mui/material';
import MainCard from '../../../components/MainCard';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export enum QuestionType {
  RADIO = 'radio',
  CHECKBOX = 'checkbox'
}

export enum SurveyStatus {
  PUBLIC = 'Public',
  DRAFT = 'Draft'
}

export interface SurveyAnswer {
  answerId: number;
  answerContent: string;
  isCorrect: boolean;
}

export interface SurveyQuestion {
  questionId: number;
  questionContent: string;
  questionType: QuestionType;
  answers: SurveyAnswer[];
  marks: number;
}

export interface SurveyList {
  surveyId: string;
  role: string;
  title: string;
  description: string;
  questions: SurveyQuestion[];
  isStarted: Date;
  isEnded: Date;
  status: SurveyStatus;
  image_type: string;
  imageCloudId: string;
}

const sampleSurvey: SurveyList = {
  surveyId: 'bfb4e922-14c6-489c-b8aa-b15b98d57830',
  role: 'Student',
  title: 'Sustainable Agriculture Practices Survey',
  description: 'Explore your knowledge and opinion about sustainable agricultural practices.',
  questions: [
    {
      questionId: 1,
      questionContent: 'What is the primary goal of sustainable agriculture?',
      questionType: QuestionType.RADIO,
      answers: [
        { answerId: 1, answerContent: 'Increase profit', isCorrect: false },
        { answerId: 2, answerContent: 'Protect the environment', isCorrect: true },
        { answerId: 3, answerContent: 'Increase production', isCorrect: false }
      ],
      marks: 10
    },
    {
      questionId: 2,
      questionContent: 'Which practices contribute to sustainable farming? (Select all that apply)',
      questionType: QuestionType.CHECKBOX,
      answers: [
        { answerId: 1, answerContent: 'Crop rotation', isCorrect: true },
        { answerId: 2, answerContent: 'Use of pesticides', isCorrect: false },
        { answerId: 3, answerContent: 'Integrated pest management', isCorrect: true },
        { answerId: 4, answerContent: 'Over-irrigation', isCorrect: false }
      ],
      marks: 20
    }
  ],
  isStarted: new Date('2024-12-01T08:00:00'),
  isEnded: new Date('2024-12-31T17:00:00'),
  status: SurveyStatus.PUBLIC,
  image_type: 'image/jpeg',
  imageCloudId: 'haupro/fd43lkjskcpod8gznwsp'
};

export default function SurveyDetails() {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<{ [key: number]: number[] }>({});
  const [currentTime, setCurrentTime] = useState<string>('');
  const [survey, setSurvey] = useState<SurveyList | null>(null);
  const navigate = useNavigate();
  let startTime: Date;
  startTime = location.state?.startTime ? new Date(location.state.startTime) : new Date();

  useEffect(() => {
    if (id === sampleSurvey.surveyId) {
      setSurvey(sampleSurvey);
    }
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const elapsed = new Date(now.getTime() - startTime.getTime());
      const formattedTime = `${String(elapsed.getUTCHours()).padStart(2, '0')}:${String(elapsed.getUTCMinutes()).padStart(
        2,
        '0'
      )}:${String(elapsed.getUTCSeconds()).padStart(2, '0')}`;
      setCurrentTime(formattedTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  if (!survey) {
    return (
      <Box sx={{ width: '100%' }}>
        <Typography>Survey not found</Typography>
      </Box>
    );
  }

  const currentQuestion = survey.questions[currentQuestionIndex];

  const handleRadioChange = (questionId: number, answerId: number) => {
    setResponses((prev) => ({ ...prev, [questionId]: [answerId] }));
  };

  const handleCheckboxChange = (questionId: number, answerId: number) => {
    setResponses((prev) => {
      const currentAnswers = prev[questionId] || [];
      if (currentAnswers.includes(answerId)) {
        return { ...prev, [questionId]: currentAnswers.filter((id) => id !== answerId) };
      } else {
        return { ...prev, [questionId]: [...currentAnswers, answerId] };
      }
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < survey.questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleSubmit = () => {
    const submissionTime = new Date();
    let totalMarksObtained = 0;
    let totalMarksPossible = 0;
    let correctAnswersCount = 0;

    const detailedResponses = survey.questions.map((question) => {
      totalMarksPossible += question.marks;
      const userAnswers = responses[question.questionId] || [];
      const correctAnswers = question.answers.filter((answer) => answer.isCorrect).map((answer) => answer.answerId);
      let pointsEarned = 0;

      if (question.questionType === QuestionType.RADIO) {
        if (userAnswers.length === 1 && correctAnswers.includes(userAnswers[0])) {
          pointsEarned = question.marks;
          totalMarksObtained += question.marks;
          correctAnswersCount += 1;
        }
      } else if (question.questionType === QuestionType.CHECKBOX) {
        if (userAnswers.length === correctAnswers.length && userAnswers.every((answerId) => correctAnswers.includes(answerId))) {
          pointsEarned = question.marks;
          totalMarksObtained += question.marks;
          correctAnswersCount += 1;
        }
      }

      return {
        questionContent: question.questionContent,
        pointsEarned,
        maxPoints: question.marks
      };
    });

    const percentageAchieved = (totalMarksObtained / totalMarksPossible) * 100;
    const totalTimeSpent = currentTime;

    const resultData = {
      responses: detailedResponses,
      startTime: startTime.toLocaleString(),
      submissionTime: submissionTime.toLocaleString(),
      totalTimeSpent,
      totalMarksObtained,
      totalMarksPossible,
      percentageAchieved: percentageAchieved.toFixed(2) + '%',
      correctAnswersCount,
      totalQuestions: survey.questions.length
    };

    navigate('/survey/survey-result', { state: resultData });
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MainCard title={survey.title}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} sx={{ borderRight: '1px solid #ccc' }}>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  Start Time: {startTime.toLocaleTimeString()} {startTime.toLocaleDateString()}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  Lapsed Time: {currentTime.slice(3, 5)}m {currentTime.slice(6)}s
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Description:
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {survey.description}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom>
                  Answer choices
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Please choose a correct answer.
                </Typography>
                <Box sx={{ mt: 4 }}>
                  <FormControl component="fieldset" fullWidth>
                    <FormLabel component="legend">
                      <Typography variant="subtitle1" color="success.main">
                        {currentQuestion.questionContent}
                      </Typography>
                    </FormLabel>
                    {currentQuestion.questionType === QuestionType.RADIO ? (
                      <RadioGroup
                        value={responses[currentQuestion.questionId]?.[0] || ''}
                        onChange={(e) => handleRadioChange(currentQuestion.questionId, parseInt(e.target.value))}
                      >
                        {currentQuestion.answers.map((answer) => (
                          <FormControlLabel
                            key={answer.answerId}
                            value={answer.answerId}
                            control={<Radio />}
                            label={answer.answerContent}
                          />
                        ))}
                      </RadioGroup>
                    ) : (
                      <FormGroup>
                        {currentQuestion.answers.map((answer) => (
                          <FormControlLabel
                            key={answer.answerId}
                            control={
                              <Checkbox
                                checked={(responses[currentQuestion.questionId] || []).includes(answer.answerId)}
                                onChange={() => handleCheckboxChange(currentQuestion.questionId, answer.answerId)}
                              />
                            }
                            label={answer.answerContent}
                          />
                        ))}
                      </FormGroup>
                    )}
                  </FormControl>
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" color="secondary" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
                Previous
              </Button>
              {currentQuestionIndex < survey.questions.length - 1 ? (
                <Button variant="contained" color="primary" onClick={handleNext}>
                  Next
                </Button>
              ) : (
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                  Submit Survey
                </Button>
              )}
            </Box>
          </MainCard>
        </Grid>
      </Grid>
    </Box>
  );
}
