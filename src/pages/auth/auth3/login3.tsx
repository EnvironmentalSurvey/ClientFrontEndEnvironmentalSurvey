import { useState, ReactNode } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import studentIcon from 'assets/images/role/student.svg';
import lecturerIcon from 'assets/images/role/lecturer.svg';
// third-party
import OtpInput from 'react18-input-otp';

// project-imports
import Logo from 'components/logo';
import AuthCard from 'sections/auth/AuthCard';
import AuthWrapper3 from 'sections/auth/AuthWrapper3';

import { Gender, ThemeMode } from 'config';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { specialization } from '../../../data/specialization';
import { useRegUser } from '../../../api/userReg';
const steps = ['1', '2', '3', '4'];

interface StepWrapperProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function StepWrapper({ children, value, index, ...other }: StepWrapperProps) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

// ================================|| LOGIN ||================================ //

export default function Login3() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [otp, setOtp] = useState<string>();
  const { mutate: registerUser, isPending: isRegistering } = useRegUser();
  const borderColor = theme.palette.mode === ThemeMode.DARK ? theme.palette.secondary[200] : theme.palette.secondary.light;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isStepSkipped = (step: number) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;

    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    console.log(`Step ${activeStep + 1} Data:`, userData);

    if (activeStep === steps.length - 1) {
      console.log('Final User Data:', userData);
      console.log('OTP:', otp);
      handleRegister();
      // setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const options = specialization.flatMap((category) =>
    category.fields.map((field) => ({
      label: field, // Tên chuyên ngành
      category: category.category // Tên nhóm ngành
    }))
  );

  const [userData, setUserData] = useState({
    role: '',
    firstName: '',
    lastName: '',
    email: '',
    specialization: '',
    memberCode: '',
    className: '',
    gender: Gender.FEMALE,
    dateOfBirth: '',
    phoneNumber: '',
    status: 2,
    avatar: 1
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserData((prevData) => ({ ...prevData, role: value }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegister = () => {
    setIsSubmitting(true);

    // Call the mutation
    registerUser(userData, {
      onSuccess: () => {
        console.log('User registered successfully');
        setActiveStep((prevStep) => prevStep + 1);
        setIsSubmitting(false);
      },
      onError: (error) => {
        console.error('Error registering user:', error);
        setIsSubmitting(false);
      },
    });
  };
  return (
    <AuthWrapper3>
      <Grid container spacing={3} sx={{ minHeight: '100%', alignContent: 'space-between' }}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Logo />
            <Typography color="secondary">
              Step
              <Typography variant="subtitle1" sx={{ display: 'inline-block', margin: '0 5px' }}>
                {activeStep + 1}
              </Typography>
              to {steps.length}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sx={{ '& > div': { margin: '24px auto' } }}>
          <AuthCard border={false}>
            {activeStep === steps.length ? (
              <>
                <Alert sx={{ my: 3 }}>
                  All steps completed - You have successfully registered. Please wait for a short period for the admin to approve and grant
                  you access to the system. Also, remember to check your email (<strong>{userData.email}</strong>) for the approval result
                  and access information.
                </Alert>
                <Button component={Link} to={'/contact-us'} color="primary" variant="contained" fullWidth>
                  Contact Support
                </Button>
              </>
            ) : (
              <>
                <StepWrapper value={activeStep} index={0}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                      <Stack spacing={1}>
                        <Typography variant="h3">Welcome to the EnviroSurvey</Typography>
                        <Typography>Sign up with your email.</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={3}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="email-login">Enter your email to continue</InputLabel>
                          <OutlinedInput
                            id="email-login"
                            type="email"
                            name="email"
                            placeholder="Enter email address"
                            fullWidth
                            value={userData.email}
                            onChange={handleInputChange}
                          />
                        </Stack>
                        <Stack direction="row" spacing={1}>
                          <Button color="secondary" variant="outlined" component={Link} to={'/login'} fullWidth>
                            Back Login
                          </Button>
                          <Button onClick={handleNext} variant="contained" color="primary" fullWidth>
                            Continue
                          </Button>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </StepWrapper>
                <StepWrapper value={activeStep} index={1}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                      <Stack spacing={1}>
                        <Typography variant="h3">What’s your role?</Typography>
                        <Typography>Please select whether you are a Student or a Lecturer</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid
                        container
                        spacing={2}
                        sx={{
                          '& .MuiFormLabel-root': {
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 180,
                            width: '100%',
                            border: '1px solid',
                            bporderColor: 'divider',
                            borderRadius: 1
                          },
                          '& .MuiRadio-root.Mui-checked + .MuiFormLabel-root': {
                            boxShadow: `0 0 0 1px ${theme.palette.primary.main}, 0px 8px 24px rgba(27, 46, 94, 0.12)`,
                            borderColor: theme.palette.primary.main,
                            color: 'primary.main',
                            bgcolor: 'primary.lighter'
                          }
                        }}
                      >
                        <Grid item sm={6}>
                          <Radio
                            id="radioStudent"
                            checked={userData.role === 'Student'}
                            onChange={handleChange}
                            value="Student"
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'Student' }}
                            sx={{ display: 'none' }}
                          />
                          <InputLabel htmlFor="radioStudent">
                            <img src={studentIcon} alt="student" width={48} height={48} />
                            <Typography variant="h5" sx={{ mt: 1 }}>
                              Student
                            </Typography>
                          </InputLabel>
                        </Grid>

                        <Grid item sm={6}>
                          <Radio
                            id="radioLecturer"
                            checked={userData.role === 'Lecturer'}
                            onChange={handleChange}
                            value="Lecturer"
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'Lecturer' }}
                            sx={{ display: 'none' }}
                          />
                          <InputLabel htmlFor="radioLecturer">
                            <img src={lecturerIcon} alt="lecturer" width={48} height={48} />
                            <Typography variant="h5" sx={{ mt: 1 }}>
                              Lecturer
                            </Typography>
                          </InputLabel>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack direction="row" spacing={1}>
                        <Button color="secondary" variant="outlined" onClick={handleBack} fullWidth>
                          Back
                        </Button>
                        <Button onClick={handleNext} variant="contained" color="primary" fullWidth>
                          Continue
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </StepWrapper>
                <StepWrapper value={activeStep} index={2}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                      <Stack spacing={1}>
                        <Typography variant="h3">Tell us About Yourself</Typography>
                        <Typography>Tell us a bit about yourself</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={3}>
                        <Grid item sm={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="First-name">First name</InputLabel>
                            <OutlinedInput
                              id="First-name"
                              type="text"
                              name="firstName"
                              placeholder="John"
                              fullWidth
                              value={userData.firstName}
                              onChange={handleInputChange}
                            />
                          </Stack>
                        </Grid>
                        <Grid item sm={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="Last-name">Last name</InputLabel>
                            <OutlinedInput
                              id="Last-name"
                              type="text"
                              name="lastName"
                              placeholder="Doe"
                              fullWidth
                              value={userData.lastName}
                              onChange={handleInputChange}
                            />
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="user-gender">Gender</InputLabel>
                            <RadioGroup row aria-label="gender" name="gender" value={userData.gender} onChange={handleInputChange}>
                              <FormControlLabel value={Gender.FEMALE} control={<Radio />} label={Gender.FEMALE} />
                              <FormControlLabel value={Gender.MALE} control={<Radio />} label={Gender.MALE} />
                            </RadioGroup>
                          </Stack>
                        </Grid>
                        <Grid item sm={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="Date-of-Birth">Date of Birth</InputLabel>
                            <OutlinedInput
                              id="Date-of-Birth"
                              type="date"
                              name="dateOfBirth"
                              placeholder="Enter your date of birth"
                              fullWidth
                              value={userData.dateOfBirth}
                              onChange={handleInputChange}
                            />
                          </Stack>
                        </Grid>

                        <Grid item sm={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="Phone-Number">Phone Number</InputLabel>
                            <OutlinedInput
                              id="Phone-Number"
                              type="text"
                              name="phoneNumber"
                              placeholder="+84 123 456 789"
                              fullWidth
                              value={userData.phoneNumber}
                              onChange={handleInputChange}
                            />
                          </Stack>
                        </Grid>
                        <Grid item sm={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="Class-name">Class name</InputLabel>
                            <OutlinedInput
                              id="Class-name"
                              type="text"
                              name="className"
                              placeholder="T5.2306.E1"
                              fullWidth
                              value={userData.className}
                              onChange={handleInputChange}
                            />
                          </Stack>
                        </Grid>
                        <Grid item sm={12}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="Member-Code">Identifier</InputLabel>
                            <OutlinedInput
                              id="Member-Code"
                              type="text"
                              name="memberCode"
                              placeholder="Roll No. or Employee Number"
                              fullWidth
                              value={userData.memberCode}
                              onChange={handleInputChange}
                            />
                          </Stack>
                        </Grid>

                        <Grid item sm={12}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="Specialization">Specialization</InputLabel>

                            <Autocomplete
                              id="specialization-autocomplete"
                              fullWidth
                              options={options}
                              groupBy={(option) => option.category}
                              getOptionLabel={(option) => option.label}
                              onChange={(event, newValue) => {
                                setUserData((prevData) => ({
                                  ...prevData,
                                  specialization: newValue?.label || ''
                                }));
                              }}
                              renderInput={(params) => <TextField {...params} placeholder="-- Select your specialization --" />}
                            />
                          </Stack>
                        </Grid>

                        <Grid item sm={12}>
                          <Stack direction="row" spacing={1}>
                            <Button color="secondary" variant="outlined" onClick={handleBack} fullWidth>
                              Back
                            </Button>
                            <Button onClick={handleNext} variant="contained" color="primary" fullWidth>
                              Continue
                            </Button>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </StepWrapper>
                <StepWrapper value={activeStep} index={3}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                      <Stack spacing={1}>
                        <Typography variant="h3">Please confirm your email id</Typography>
                        <Typography>
                          We have sent a verification code to your email. Please enter the code below to verify your email address.
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={3}>
                        <OtpInput
                          value={otp}
                          onChange={(otp: string) => setOtp(otp)}
                          numInputs={4}
                          containerStyle={{ justifyContent: 'space-between' }}
                          inputStyle={{
                            width: '100%',
                            margin: '8px',
                            padding: '10px',
                            border: '1px solid',
                            borderColor: { borderColor },
                            borderRadius: 4,
                            ':hover': {
                              borderColor: theme.palette.primary.main
                            }
                          }}
                          focusStyle={{
                            outline: 'none',
                            boxShadow: theme.customShadows.primary,
                            border: '1px solid ',
                            borderColor: theme.palette.primary.main
                          }}
                        />
                        <Stack direction="row" spacing={1}>
                          <Button color="secondary" variant="outlined" onClick={handleBack} fullWidth>
                            Back
                          </Button>
                          <Button onClick={handleNext} variant="contained" color="primary" fullWidth>
                            Continue
                          </Button>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </StepWrapper>
              </>
            )}
          </AuthCard>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="center" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography align="center">
              By signing up, you confirm to have read EnviroSurvey
              <Typography component={Link} to={'#'} sx={{ textDecoration: 'none', px: 0.5 }} color="primary">
                Privacy Policy
              </Typography>
              and agree to the
              <Typography component={Link} to={'#'} sx={{ textDecoration: 'none', pl: 0.5 }} color="primary">
                Terms of Service
              </Typography>
              .
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </AuthWrapper3>
  );
}
