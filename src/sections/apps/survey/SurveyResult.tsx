import { useLocation } from 'react-router-dom';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid } from '@mui/material';

export default function SurveyResult() {
  const location = useLocation();
  const resultData = location.state;

  if (!resultData) {
    return <Typography>No survey result data available.</Typography>;
  }

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Survey Results
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            <strong>Start Time:</strong> {resultData.startTime}
          </Typography>
          <Typography variant="body1">
            <strong>Submission Time:</strong> {resultData.submissionTime}
          </Typography>
          <Typography variant="body1">
            <strong>Total Time Taken:</strong> {resultData.totalTimeSpent}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            <strong>Total Marks Obtained:</strong> {resultData.totalMarksObtained}
          </Typography>
          <Typography variant="body1">
            <strong>Total Marks Possible:</strong> {resultData.totalMarksPossible}
          </Typography>
          <Typography variant="body1">
            <strong>Percentage Achieved:</strong> {resultData.percentageAchieved}
          </Typography>
          <Typography variant="body1">
            <strong>Correct Answers:</strong> {resultData.correctAnswersCount} of {resultData.totalQuestions}
          </Typography>
        </Grid>
      </Grid>

      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>QUESTION</strong>
              </TableCell>
              <TableCell>
                <strong>POINTS EARNED</strong>
              </TableCell>
              <TableCell>
                <strong>MAX POINTS</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resultData.responses &&
              resultData.responses.map((response: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{response.questionContent}</TableCell>
                  <TableCell>{response.pointsEarned}</TableCell>
                  <TableCell>{response.maxPoints}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
