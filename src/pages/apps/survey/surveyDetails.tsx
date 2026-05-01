import Grid from '@mui/material/Grid';
import MainCard from '../../../components/MainCard';
import SurveyDetails from '../../../sections/apps/survey/SurveyDetails';

export default function SurveyDetailsPage() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard content={false}>
              <SurveyDetails />
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
