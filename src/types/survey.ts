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

export interface SurveyQuestion {
  questionId: number;
  questionContent: string;
  questionType: QuestionType;
  answers: SurveyAnswer[];
  marks: number;
}

export enum QuestionType {
  RADIO = 'radio',
  CHECKBOX = 'checkbox'
}

export interface SurveyAnswer {
  answerId: number;
  answerContent: string;
  isCorrect: boolean;
}

export enum SurveyStatus {
  PUBLIC = 'Public',
  DRAFT = 'Draft'
}

export interface CompetitionList {
  uuid: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  surveyId: string;
  status: CompetitionStatus;
}

export interface CompetitionProps {
  modal: boolean;
}

export interface CompetitionStatus {
  Ongoing: string;
  Completed: string;
  Upcoming: string;
}

export type historyJoinList = {
  historyJoinId: string;
  userId: string;
  userName: string;
  surveyId: string;
  surveyTitle: string;
  historyJoinDate: string;
  status: 'Completed' | 'In Progress';
  totalMarksObtained: number | null;
  totalMarksPossible: number;
  percentageAchieved: number | null;
  totalTimeSpent: string | null;
};

export type LeaderboardEntry = {
  leaderboardId: string;
  userId: string;
  userName: string;
  totalPoints: number;
  totalSurveys: number;
  rank: number | null;
  updatedAt: string;
};
