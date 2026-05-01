import { historyJoinList } from '../types/survey';

export const historyJoinData: historyJoinList[] = [
  {
    userId: 'U001',
    userName: 'John Doe',
    historyJoinId: 'C001',
    surveyId: '8fab4d90-8a8d-44d6-a7c4-4a4fbb2bbe15',
    surveyTitle: 'Environment Quiz',
    historyJoinDate: '2024-01-05 10:00 AM',
    status: 'Completed',
    totalMarksObtained: 8,
    totalMarksPossible: 10,
    percentageAchieved: 50,
    totalTimeSpent: '0:15:00'
  },
  {
    userId: 'U002',
    userName: 'Jane Doe',
    historyJoinId: 'C001',
    surveyId: '8fab4d90-8a8d-44d6-a7c4-4a4fbb2bbe15',
    surveyTitle: 'Environment Quiz',
    historyJoinDate: '2024-01-05 11:00 AM',
    status: 'Completed',
    totalMarksObtained: 7,
    totalMarksPossible: 10,
    percentageAchieved: 90,
    totalTimeSpent: '0:20:00'
  },
  {
    userId: 'U003',
    userName: 'Alex Johnson',
    historyJoinId: 'C001',
    surveyId: '8fab4d90-8a8d-44d6-a7c4-4a4fbb2bbe15',
    surveyTitle: 'Environment Quiz',
    historyJoinDate: '2024-01-05 12:00 PM',
    status: 'Completed',
    totalMarksObtained: 9,
    totalMarksPossible: 10,
    percentageAchieved: 90,
    totalTimeSpent: '0:25:00'
  },
  {
    userId: 'U004',
    userName: 'Sarah Lee',
    historyJoinId: 'C002',
    surveyId: '902a6fd9-ef5d-4315-85d3-3b4e46640073',
    surveyTitle: 'Recycling Awareness',
    historyJoinDate: '2024-01-06 9:00 AM',
    status: 'In Progress',
    totalMarksObtained: null,
    totalMarksPossible: 10,
    percentageAchieved: null,
    totalTimeSpent: null
  }
];

export const competitionData = [
  {
    uuid: 'bfb4e922-14c6-489c-b8aa-b15b98d57830',
    title: 'Sustainable Agriculture Practices Survey',
    imageUrl: 'http://res.cloudinary.com/dvtcwbbck/image/upload/v1735225150/haupro/fd43lkjskcpod8gznwsp.jpg',
    description: 'Explore your knowledge and opinion about sustainable agricultural practices.',
    startDate: '2024-12-01T08:00:00',
    endDate: '2024-12-31T17:00:00',
    surveyId: 'ac3d5f70-c6b4-4b89-9d4c-8ecb37f7d6b0',
    role: 'Student',
    status: 'Ongoing'
  },
  {
    uuid: '8688062a-e29e-4907-9374-3ad2990e51c8',
    imageUrl: 'http://res.cloudinary.com/dvtcwbbck/image/upload/v1735225579/haupro/zydhjwhahhgstbhnao7l.png',

    title: 'Environmental Awareness Survey',
    description: 'Assess your understanding of environmental protection measures.',
    startDate: '2024-01-15T17:30:00',
    endDate: '2024-01-20T19:00:00',
    surveyId: '902a6fd9-ef5d-4315-85d3-3b4e46640073',
    role: 'Lecturer',
    status: 'Upcoming'
  },

  {
    description: 'Share your opinion on global climate change and its impact.',
    imageUrl: 'http://res.cloudinary.com/dvtcwbbck/image/upload/v1735225627/haupro/d5olbx6aovmngkmcv1ql.jpg',

    startDate: '2024-01-01T17:30:00',
    endDate: '2024-01-10T19:00:00',
    status: 'Completed',
    uuid: '0cf2263f-e38e-4346-a0ce-1087fae2bb7a',
    role: 'Student',
    title: 'Climate Change Feedback Survey'
  },

  {
    uuid: 'bfb4e922-14c6-489c-b8aa-b15b98d57830',
    imageUrl: 'http://res.cloudinary.com/dvtcwbbck/image/upload/v1735225651/haupro/qwmt6bzz62ygumovurw3.jpg',

    title: 'Waste Management Survey',
    description: 'Participate to learn about effective waste management techniques.',
    startDate: '2024-12-01T08:00:00',
    endDate: '2024-12-31T17:00:00',
    surveyId: 'ac3d5f70-c6b4-4b89-9d4c-8ecb37f7d6b0',
    role: 'Student',
    status: 'Completed'
  }
];
