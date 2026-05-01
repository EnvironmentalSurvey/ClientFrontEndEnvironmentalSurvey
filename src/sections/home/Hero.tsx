import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

// material-ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';

// ==============================|| LANDING - HERO PAGE WITH SWIPER ||============================== //

export default function HeroPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        pb: 12.5,
        pt: 10,
        display: 'flex',
        alignItems: 'center',
        backgroundImage: 'url(src/assets/images/background/environmental-protection-act-iStock.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
      >
        <SwiperSlide>
          <motion.div
            initial={{ opacity: 0, translateY: 550 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              type: 'spring',
              stiffness: 150,
              damping: 30
            }}
          ></motion.div>
        </SwiperSlide>

        <Box sx={{ mb: 30, p: 4, backgroundColor: 'rgba(180,233,245,0.7)' }}>
          <Container>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '1.825rem', sm: '2rem', md: '3.4375rem' },
                fontWeight: 700,
                lineHeight: 1.2
              }}
            >
              Unlock the Power of Learning and Environmental Protection with{' '}
              <Typography
                variant="h1"
                component="span"
                sx={{
                  fontSize: 'inherit',
                  background: 'linear-gradient(90deg, rgb(37, 161, 244), rgb(249, 31, 169), rgb(37, 161, 244)) 0 0 / 400% 100%',
                  color: 'transparent',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  animation: 'move-bg 24s infinite linear',
                  '@keyframes move-bg': { '100%': { backgroundPosition: '400% 0' } }
                }}
              >
                EnviroSurvey
              </Typography>
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: '0.875rem', md: '1rem' },
                fontWeight: 400,
                lineHeight: { xs: 1.4, md: 1.4 }
              }}
            >
              The eProject is revolutionizing how students interact with real-world environmental challenges by providing a hands-on
              learning experience. From surveys to live seminars, we offer the tools to help you grow as an environmental advocate.
            </Typography>
            <Box sx={{ display: 'flex', mt: 2, justifyContent: 'start', alignItems: 'center', gap: 2 }}>
              <TextField
                variant="outlined"
                placeholder="Enter your email"
                size="small"
                sx={{
                  width: '250px',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#1D2630'
                    },
                    '&:hover fieldset': {
                      borderColor: '#1D2630'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1D2630'
                    }
                  }
                }}
              />
              <AnimateButton>
                <Button size="large" color="primary" variant="contained" sx={{ whiteSpace: 'nowrap' }}>
                  Join Now
                </Button>
              </AnimateButton>
            </Box>
          </Container>
        </Box>
      </Swiper>
    </Box>
  );
}
