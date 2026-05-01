// material-ui
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

// third party
import { motion } from 'framer-motion';
// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './styles.css';
// project-imports
import FadeInWhenVisible from './Animation';
import MainCard from 'components/MainCard';
import { surveys } from 'data/surveys';
// assets
import { ExportSquare } from 'iconsax-react';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// ==============================|| LANDING - TechnologiesPage ||============================== //

export default function SurveysPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container>
      <Grid container spacing={3} alignItems="center" justifyContent="center" sx={{ mb: { md: 10, xs: 2.5 } }}>
        <Grid item xs={12}>
          <Grid container spacing={2} sx={{ textAlign: 'center', marginBottom: 3 }}>
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30,
                  delay: 0.2
                }}
              >
                <Typography variant="h2">Explore Recent Surveys</Typography>
                <Box sx={{ border: '2px solid #1D2630', width: '150px', margin: 'auto', marginTop: '10px' }} />
              </motion.div>
            </Grid>
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30,
                  delay: 0.4
                }}
              ></motion.div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Swiper
            spaceBetween={30}
            slidesPerView={3}
            grabCursor={true}
            navigation={true}
            modules={[Navigation]}
            breakpoints={{
              0: {
                slidesPerView: 2
              },
              768: {
                slidesPerView: 3
              }
            }}
          >
            {surveys.map((tech, index) => (
              <SwiperSlide key={index}>
                <FadeInWhenVisible>
                  <MainCard content={false} sx={{ backgroundColor: '#5FBA73', borderColor: '#1D2630' }}>
                    <CardMedia component="img" image={tech.url} alt="green iguana" />
                    <CardContent>
                      <Typography variant={isMobile ? 'h5' : 'h4'} gutterBottom>
                        {tech.label}
                      </Typography>
                      <Typography variant="body1">{tech.description}</Typography>
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="large"
                        startIcon={<ExportSquare />}
                        component={Link}
                        sx={{
                          marginTop: 1,
                          fontWeight: 500,
                          color: 'secondary.darker'
                        }}
                      >
                        Reference
                      </Button>
                    </CardContent>
                  </MainCard>
                </FadeInWhenVisible>
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>
      </Grid>
    </Container>
  );
}
