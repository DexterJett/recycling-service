import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  RecyclingOutlined,
  LocalShipping,
  EmojiNature,
  GroupsOutlined,
} from '@mui/icons-material';

function AboutUs() {
  const features = [
    {
      icon: <RecyclingOutlined color="primary" sx={{ fontSize: 40 }} />,
      title: 'Professionelles Recycling',
      description: 'Wir garantieren eine fachgerechte und umweltfreundliche Entsorgung aller Materialien.'
    },
    {
      icon: <LocalShipping color="primary" sx={{ fontSize: 40 }} />,
      title: 'Zuverlässige Abholung',
      description: 'Pünktliche Abholung gemäß Ihrem gewählten Abo-Modell.'
    },
    {
      icon: <EmojiNature color="primary" sx={{ fontSize: 40 }} />,
      title: 'Umweltschutz',
      description: 'Unser Beitrag zu einer nachhaltigeren Zukunft durch verantwortungsvolles Recycling.'
    },
    {
      icon: <GroupsOutlined color="primary" sx={{ fontSize: 40 }} />,
      title: 'Kundenservice',
      description: 'Persönliche Beratung und Support für alle Ihre Recycling-Bedürfnisse.'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Hero Section */}
      <Box sx={{ mb: 8, textAlign: 'center' }}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 'bold' }}
        >
          Über Uns
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          Ihr verlässlicher Partner für nachhaltiges Recycling
        </Typography>
      </Box>

      {/* Mission Statement */}
      <Paper elevation={3} sx={{ p: 4, mb: 8, backgroundColor: 'primary.main', color: 'white' }}>
        <Typography variant="h4" gutterBottom align="center">
          Unsere Mission
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Wir setzen uns für eine nachhaltige Zukunft ein, indem wir innovative Recycling-Lösungen
          anbieten, die es unseren Kunden einfach machen, einen positiven Beitrag zum Umweltschutz
          zu leisten.
        </Typography>
      </Paper>

      {/* Features Grid */}
      <Grid container spacing={4} sx={{ mb: 8 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {feature.icon}
                <Typography variant="h5" sx={{ ml: 2 }}>
                  {feature.title}
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary">
                {feature.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Company Values */}
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Unsere Werte
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <RecyclingOutlined color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Nachhaltigkeit" 
                  secondary="Wir handeln umweltbewusst und zukunftsorientiert"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <GroupsOutlined color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Kundenorientierung" 
                  secondary="Ihre Zufriedenheit steht bei uns an erster Stelle"
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <EmojiNature color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Innovation" 
                  secondary="Wir entwickeln stetig neue Lösungen für besseres Recycling"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LocalShipping color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Zuverlässigkeit" 
                  secondary="Auf unseren Service können Sie sich verlassen"
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default AboutUs;
