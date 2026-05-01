// material-ui
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// third party
// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './styles.css';
// project-imports
import FadeInWhenVisible from './Animation';
import MainCard from 'components/MainCard';
import PersonIcon from '@mui/icons-material/Person';
import { motion } from 'framer-motion';
// assets
import { ExportSquare } from 'iconsax-react';
import Box from '@mui/material/Box';
import { competitionData } from '../../data/competitions';
import { format } from 'date-fns';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useEffect, useState } from 'react';
// ==============================|| HOME - CompetitionsPage ||============================== //

export default function CompetitionsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [dots, setDots] = useState('.');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev === '.') return '..';
        if (prev === '..') return '...';
        return '.';
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
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
                <Typography variant="h2">Explore Recent Competitions</Typography>
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
            {competitionData.map((tech, index) => (
              <SwiperSlide key={index}>
                <FadeInWhenVisible>
                  <MainCard sx={{ backgroundColor: '#5FBA73', borderColor: '#1D2630' }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant={isMobile ? 'h5' : 'h4'} gutterBottom>
                          {tech.title}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>{tech.description}</Typography>
                      </Grid>
                      <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PersonIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                        <Typography variant="body2">
                          <strong>Role:</strong> {tech.role}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AccessTimeIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                        <Typography variant="body2">
                          <strong>Start:</strong> {format(new Date(tech.startDate), 'HH:mm dd/MM/yyyy')}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <EventAvailableIcon sx={{ fontSize: 18, color: 'secondary.main' }} />
                        <Typography variant="body2">
                          <strong>End:</strong> {format(new Date(tech.endDate), 'HH:mm dd/MM/yyyy')}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CheckCircleIcon
                          sx={{
                            fontSize: 18,
                            color: 'info.main'
                          }}
                        />
                        <Typography variant="body2">
                          <strong>Status:</strong>
                        </Typography>
                        {tech.status === 'Ongoing' ? (
                          <Typography
                            variant="body2"
                            component={motion.div}
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                            sx={{
                              backgroundColor: 'warning.light',
                              borderRadius: '5px'
                            }}
                          >
                            {tech.status}
                            <motion.span
                              style={{ marginLeft: '5px' }}
                              animate={{ opacity: [1, 1, 1], x: 0 }}
                              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                            >
                              {dots}
                            </motion.span>
                          </Typography>
                        ) : (
                          <Typography
                            variant="body2"
                            sx={{
                              backgroundColor: tech.status === 'Completed' ? 'success.light' : 'info.light',
                              borderRadius: '5px'
                            }}
                          >
                            {tech.status}
                          </Typography>
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={2} justifyContent="flex-start">
                          <Grid item>
                            <Button
                              variant="outlined"
                              color="secondary"
                              size="large"
                              startIcon={<ExportSquare />}
                              sx={{
                                fontWeight: 500,
                                color: 'secondary.darker'
                              }}
                            >
                              Reference
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
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
