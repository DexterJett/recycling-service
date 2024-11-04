import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';

function SubscriptionCard({ title, price, features, onSelect }) {
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          €{price}/Monat
        </Typography>
        {features.map((feature, index) => (
          <Typography key={index} variant="body2" color="text.secondary">
            • {feature}
          </Typography>
        ))}
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={onSelect}>
          Abo wählen
        </Button>
      </CardActions>
    </Card>
  );
}

export default SubscriptionCard;