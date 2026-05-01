// project-imports

// ==============================|| SAMPLE PAGE ||============================== //

import HeroPage from '../../sections/home/Hero';
import CompetitionsPage from '../../sections/home/Competitions';
import SurveysPage from '../../sections/home/Surveys';

export default function Home() {
  return (
    <>
      <HeroPage />
      <SurveysPage />
      <CompetitionsPage />
    </>
  );
}
