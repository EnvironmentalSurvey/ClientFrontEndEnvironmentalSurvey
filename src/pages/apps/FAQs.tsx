import React from 'react';
import MainCard from 'components/MainCard';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Mock FAQs Data
const faqsData = [
  {
    question: 'How to register for the survey?',
    answer:
      'To register, go to the registration page and provide your name, roll number/employee number, and other required details. Your registration request will be approved by the admin.'
  },
  {
    question: 'How to participate in the survey?',
    answer: 'Once you are logged in, go to the Survey Board, choose a survey, and click on "Get Started" to participate.'
  },
  {
    question: 'How will I be intimated with the new survey?',
    answer: 'You will receive notifications on your registered email or in your dashboard when a new survey is available.'
  },
  {
    question: 'What if it gives an error after submitting the survey?',
    answer: 'If an error occurs, please contact support immediately with details of the survey and error message.'
  },
  {
    question: 'Why am I unable to participate in the survey?',
    answer:
      'There are two possible reasons: 1) You are not a registered user, or 2) There is a technical issue. Contact support for assistance.'
  },
  {
    question: 'Why is my registration request not accepted?',
    answer:
      'Your registration request may be declined if the admin is unable to verify your institution details. Please ensure all details are correct.'
  },
  {
    question: 'Will there be any benefit if I participate in the survey?',
    answer: 'Yes, the top participants will be recognized and awarded based on their performance and participation.'
  },
  {
    question: 'How to participate in the competitions?',
    answer: 'Go to the Competitions section and choose a competition. Follow the instructions to register and submit your entry.'
  },
  {
    question: 'What if there are some arrears in participating in the survey?',
    answer: 'If you miss participating in the survey, you can check with the admin for any re-availability or alternate options.'
  }
];
export default function FAQsPage() {
  return (
    <MainCard title="Frequently Asked Questions (FAQs)">
      <Box>
        {faqsData.map((faq, index) => (
          <Accordion key={index} sx={{ marginBottom: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" color="text.secondary">
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </MainCard>
  );
}
