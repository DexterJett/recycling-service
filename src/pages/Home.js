import { Container, Grid, Typography } from '@mui/material';
import SubscriptionCard from '../components/Subscription/SubscriptionCard';

function Home() {
  const subscriptions = [
    {
      title: 'Basis Abo',
      price: 29.99,
      features: [
        'Monatliche Abholung',
        'Basis Recycling-Service',
        'Email Support'
      ]
    },
    {
      title: 'Premium Abo',
      price: 49.99,
      features: [
        'Zweiwöchentliche Abholung',
        'Erweiterter Recycling-Service',
        'Prioritäts-Support',
        'Flexible Abholzeiten'
      ]
    },
    {
      title: 'Business Abo',
      price: 99.99,
      features: [
        'Wöchentliche Abholung',
        'Kompletter Recycling-Service',
        '24/7 Support',
        'Maßgeschneiderte Lösungen',
        'Recycling-Bericht'
      ]
    }
  ];

  const handleSubscriptionSelect = (subscription) => {
    // Hier später die Logik für die Weiterleitung zur Anmeldung/Registrierung
    console.log('Selected subscription:', subscription);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Unsere Recycling-Abonnements
      </Typography>
      <Typography variant="h6" gutterBottom align="center" color="text.secondary">
        Wählen Sie das passende Abo für Ihre Recycling-Bedürfnisse
      </Typography>
      <Grid container justifyContent="center" spacing={4}>
        {subscriptions.map((sub, index) => (
          <Grid item key={index}>
            <SubscriptionCard
              title={sub.title}
              price={sub.price}
              features={sub.features}
              onSelect={() => handleSubscriptionSelect(sub)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;