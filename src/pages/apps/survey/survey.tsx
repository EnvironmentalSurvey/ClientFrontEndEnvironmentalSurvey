import Grid from '@mui/material/Grid';

// project-imports
import MainCard from 'components/MainCard';
import HomSurveyTabs from '../../../sections/apps/survey/HomSurveyTabs';

// assets

// ==============================|| COMPONENTS - CARD ||============================== //

export default function SurveysPage() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard content={false}>
              <HomSurveyTabs />
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
