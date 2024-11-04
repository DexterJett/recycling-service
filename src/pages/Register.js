import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Box
} from '@mui/material';
import auth from '../services/auth';
import emailService from '../services/emailService';

const validationSchema = Yup.object({
  firstName: Yup.string().required('Vorname ist erforderlich'),
  lastName: Yup.string().required('Nachname ist erforderlich'),
  email: Yup.string().email('Ungültige E-Mail').required('E-Mail ist erforderlich'),
  password: Yup.string()
    .min(8, 'Passwort muss mindestens 8 Zeichen lang sein')
    .required('Passwort ist erforderlich'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwörter müssen übereinstimmen')
    .required('Passwort-Bestätigung ist erforderlich')
});

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await auth.register({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password
      });
      await emailService.sendRegistrationEmail(values);
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Registrierung fehlgeschlagen');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Registrierung
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
            <Form>
              <TextField
                fullWidth
                name="firstName"
                label="Vorname"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
                margin="normal"
              />
              <TextField
                fullWidth
                name="lastName"
                label="Nachname"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
                margin="normal"
              />
              <TextField
                fullWidth
                name="email"
                label="E-Mail"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                margin="normal"
              />
              <TextField
                fullWidth
                name="password"
                label="Passwort"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                margin="normal"
              />
              <TextField
                fullWidth
                name="confirmPassword"
                label="Passwort bestätigen"
                type="password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
                margin="normal"
              />
              <Box sx={{ mt: 2 }}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Registrieren
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
}

export default Register;