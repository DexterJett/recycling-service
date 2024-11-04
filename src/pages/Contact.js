import { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Alert,
  MenuItem
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import emailService from '../services/emailService';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name ist erforderlich'),
  email: Yup.string()
    .email('Ungültige E-Mail-Adresse')
    .required('E-Mail ist erforderlich'),
  subject: Yup.string()
    .required('Betreff ist erforderlich'),
  message: Yup.string()
    .required('Nachricht ist erforderlich')
    .min(10, 'Nachricht muss mindestens 10 Zeichen lang sein'),
  category: Yup.string()
    .required('Kategorie ist erforderlich')
});

const categories = [
  { value: 'general', label: 'Allgemeine Anfrage' },
  { value: 'subscription', label: 'Abo-Anfrage' },
  { value: 'support', label: 'Technischer Support' },
  { value: 'feedback', label: 'Feedback' }
];

function Contact() {
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      category: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await emailService.sendContactFormEmail(values);
        setSubmitStatus({
          type: 'success',
          message: 'Ihre Nachricht wurde erfolgreich gesendet. Wir werden uns bald bei Ihnen melden.'
        });
        resetForm();
      } catch (error) {
        setSubmitStatus({
          type: 'error',
          message: 'Es gab einen Fehler beim Senden Ihrer Nachricht. Bitte versuchen Sie es später erneut.'
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Kontaktieren Sie uns
        </Typography>
        
        <Typography variant="body1" paragraph align="center" sx={{ mb: 4 }}>
          Haben Sie Fragen? Wir sind hier, um Ihnen zu helfen. Füllen Sie einfach das Formular aus,
          und wir werden uns schnellstmöglich bei Ihnen melden.
        </Typography>

        {submitStatus.message && (
          <Alert 
            severity={submitStatus.type} 
            sx={{ mb: 3 }}
            onClose={() => setSubmitStatus({ type: '', message: '' })}
          >
            {submitStatus.message}
          </Alert>
        )}

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="E-Mail"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="category"
                name="category"
                select
                label="Kategorie"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.category && Boolean(formik.errors.category)}
                helperText={formik.touched.category && formik.errors.category}
              >
                {categories.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="subject"
                name="subject"
                label="Betreff"
                value={formik.values.subject}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.subject && Boolean(formik.errors.subject)}
                helperText={formik.touched.subject && formik.errors.subject}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="message"
                name="message"
                label="Nachricht"
                multiline
                rows={4}
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.message && Boolean(formik.errors.message)}
                helperText={formik.touched.message && formik.errors.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={formik.isSubmitting}
                  sx={{ minWidth: 200 }}
                >
                  {formik.isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Contact;
