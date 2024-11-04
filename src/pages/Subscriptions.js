import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const subscriptionPlans = [
  {
    id: 'basic',
    title: 'Basis Abo',
    price: '29.90',
    interval: 'pro Monat',
    features: [
      'Monatliche Abholung',
      'Basis Recycling-Service',
      'E-Mail Support'
    ]
  },
  {
    id: 'premium',
    title: 'Premium Abo',
    price: '49.90',
    interval: 'pro Monat',
    features: [
      'Zweiwöchentliche Abholung',
      'Erweiterter Recycling-Service',
      'Priority Support',
      'Flexible Abholzeiten'
    ]
  },
  {
    id: 'business',
    title: 'Business Abo',
    price: '99.90',
    interval: 'pro Monat',
    features: [
      'Wöchentliche Abholung',
      'Kompletter Recycling-Service',
      '24/7 Support',
      'Express Abholung',
      'Maßgeschneiderte Lösungen'
    ]
  }
];

function Subscriptions() {
  const navigate = useNavigate();

  const handleSubscribe = (planId) => {
    // Überprüfen ob User eingeloggt ist
    const isLoggedIn = false; // Dies sollten Sie mit Ihrer Auth-Logik verbinden
    
    if (!isLoggedIn) {
      navigate('/login', { state: { redirectTo: '/checkout', planId } });
      return;
    }
    
    navigate('/checkout', { state: { planId } });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        Unsere Abo-Angebote
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        Wählen Sie das passende Recycling-Abo für Ihre Bedürfnisse
      </Typography>
      
      <Grid container spacing={4} sx={{ mt: 4 }}>
        {subscriptionPlans.map((plan) => (
          <Grid item key={plan.id} xs={12} md={4}>
            <Card sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              '&:hover': {
                boxShadow: 6,
                transform: 'scale(1.02)',
                transition: 'transform 0.2s ease-in-out'
              }
            }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h4" component="h2" align="center">
                  {plan.title}
                </Typography>
                <Typography variant="h3" component="p" align="center" color="primary" sx={{ my: 2 }}>
                  CHF {plan.price}
                </Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 2 }}>
                  {plan.interval}
                </Typography>
                <List>
                  {plan.features.map((feature, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <CheckCircleOutlineIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                <Button 
                  variant="contained" 
                  size="large"
                  onClick={() => handleSubscribe(plan.id)}
                >
                  Jetzt abonnieren
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Subscriptions;
