import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
  Alert,
} from '@mui/material';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import emailService from '../services/emailService';

const steps = ['Zahlungsmethode', 'Zahlungsdetails', 'Bestätigung'];

const paymentMethods = [
  { id: 'visa', label: 'Visa' },
  { id: 'mastercard', label: 'Mastercard' },
  { id: 'amex', label: 'American Express' },
  { id: 'maestro', label: 'Maestro' },
];

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });
  const [error, setError] = useState('');

  const planId = location.state?.planId;

  const handleNext = () => {
    if (activeStep === 0 && !paymentMethod) {
      setError('Bitte wählen Sie eine Zahlungsmethode');
      return;
    }
    if (activeStep === 1) {
      if (!validateCardDetails()) {
        return;
      }
      // Hier würde die Zahlungsverarbeitung stattfinden
      processPayment();
    }
    setError('');
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
    setError('');
  };

  const validateCardDetails = () => {
    if (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv) {
      setError('Bitte füllen Sie alle Felder aus');
      return false;
    }
    // Hier weitere Validierungen hinzufügen
    return true;
  };

  const processPayment = async () => {
    try {
      // Hier die Zahlungsverarbeitung implementieren
      // Beispiel: API-Aufruf zur Zahlungsverarbeitung
      console.log('Verarbeite Zahlung:', { paymentMethod, cardDetails, planId });
      await emailService.sendSubscriptionEmail(
        { email: 'user@example.com' }, // Hier später die echten Benutzerdaten einsetzen
        { planId, paymentMethod }
      );
      await emailService.sendAdminNotification('new_subscription', {
        planId,
        paymentMethod,
        // weitere Details...
      });
    } catch (err) {
      setError('Zahlungsverarbeitung fehlgeschlagen');
      setActiveStep(1);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <FormControl component="fieldset">
            <RadioGroup
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              {paymentMethods.map((method) => (
                <FormControlLabel
                  key={method.id}
                  value={method.id}
                  control={<Radio />}
                  label={method.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );
      case 1:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Kartennummer"
                value={cardDetails.number}
                onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name auf der Karte"
                value={cardDetails.name}
                onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Gültig bis"
                placeholder="MM/JJ"
                value={cardDetails.expiry}
                onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="CVV"
                value={cardDetails.cvv}
                onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Box sx={{ textAlign: 'center' }}>
            <CheckCircleIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Vielen Dank für Ihre Bestellung!
            </Typography>
            <Typography variant="subtitle1">
              Sie erhalten in Kürze eine Bestätigungs-E-Mail.
            </Typography>
          </Box>
        );
      default:
        return 'Unbekannter Schritt';
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Checkout
        </Typography>
        
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box sx={{ mt: 2, mb: 4 }}>
          {getStepContent(activeStep)}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          {activeStep !== 0 && activeStep !== 2 && (
            <Button onClick={handleBack} sx={{ mr: 1 }}>
              Zurück
            </Button>
          )}
          {activeStep === steps.length - 1 ? (
            <Button onClick={() => navigate('/')} variant="contained">
              Zur Startseite
            </Button>
          ) : (
            <Button onClick={handleNext} variant="contained">
              {activeStep === steps.length - 2 ? 'Bezahlen' : 'Weiter'}
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default Checkout;
