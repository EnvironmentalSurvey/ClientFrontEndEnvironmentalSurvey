import { useState, ReactNode, SyntheticEvent, useEffect } from 'react';

// third party
// swiper
import 'swiper/css';
import 'swiper/css/navigation';
import './styles.css';

// ==============================|| HOME - CompetitionsPage ||============================== //
// material-ui
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { competitionData } from '../../../data/competitions';
import MainCard from '../../../components/MainCard';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { format } from 'date-fns';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RankingHistory } from './RankingHistory';

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

// ==============================|| TAB PANEL ||============================== //

function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

// ==============================|| CARD - TAB ||============================== //

export default function HomSurveyTabs({ activeTab }: { activeTab?: number }) {
  const [value, setValue] = useState(activeTab || 0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Surveys" {...a11yProps(0)} />
          <Tab label="Leaderboard" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Grid container spacing={3} sx={{ mb: { md: 10, xs: 2.5 } }}>
          {competitionData.map((tech, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <MainCard sx={{ borderColor: '#D9D9D9', height: '100%' }}>
                <Box
                  component="img"
                  src={tech.imageUrl}
                  alt={tech.title}
                  sx={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: 1 }}
                />

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6" fontWeight="bold" sx={{ marginTop: 2 }}>
                      {tech.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                      {tech.description}
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
                    <CheckCircleIcon sx={{ fontSize: 18, color: 'info.main' }} />
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
                        {tech.status === 'Ongoing' ? (
                          <Link
                            to={`/survey/${tech.uuid}`}
                            state={{ startTime: new Date().toISOString() }}
                            style={{ textDecoration: 'none' }}
                          >
                            <Typography variant="h6" color="primary">
                              Get started{' ->'}
                            </Typography>
                          </Link>
                        ) : tech.status === 'Upcoming' ? (
                          <Typography variant="h6" color="text.secondary">
                            Survey is not available!
                          </Typography>
                        ) : tech.status === 'Completed' ? (
                          <Typography variant="h6" color="text.secondary">
                            You have already participated
                          </Typography>
                        ) : null}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </MainCard>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <RankingHistory />
      </TabPanel>
    </Box>
  );
}
