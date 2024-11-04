// Hier können Sie später einen echten E-Mail-Service wie SendGrid oder AWS SES integrieren
const emailTemplates = {
  registration: {
    subject: 'Willkommen bei unserem Recycling-Service',
    body: (username) => `
      Hallo ${username},
      
      vielen Dank für Ihre Registrierung bei unserem Recycling-Service!
      
      Entdecken Sie jetzt unsere Abo-Angebote:
      - Basis Abo
      - Premium Abo
      - Business Abo
      
      Besuchen Sie unsere Angebotsseite: [LINK]
      
      Mit freundlichen Grüßen
      Ihr Recycling-Team
    `
  },
  subscriptionConfirmation: {
    subject: 'Bestätigung Ihrer Abo-Bestellung',
    body: (username, planName) => `
      Hallo ${username},
      
      vielen Dank für die Bestellung unseres ${planName}!
      
      Wir werden Ihre Bestellung schnellstmöglich bearbeiten und uns mit den nächsten Schritten bei Ihnen melden.
      
      Mit freundlichen Grüßen
      Ihr Recycling-Team
    `
  },
  contactForm: {
    subject: 'Ihre Anfrage bei unserem Recycling-Service',
    body: (username) => `
      Hallo ${username},
      
      vielen Dank für Ihre Anfrage. Wir werden uns schnellstmöglich bei Ihnen melden.
      
      Mit freundlichen Grüßen
      Ihr Recycling-Team
    `
  }
};

const emailService = {
  sendRegistrationEmail: async (userData) => {
    try {
      console.log('Sende Registrierungs-E-Mail an:', userData.email);
      // Hier später die echte E-Mail-Versand-Logik implementieren
      return {
        success: true,
        message: 'Registrierungs-E-Mail erfolgreich gesendet'
      };
    } catch (error) {
      console.error('Fehler beim Senden der Registrierungs-E-Mail:', error);
      throw new Error('E-Mail konnte nicht gesendet werden');
    }
  },

  sendSubscriptionEmail: async (userData, planDetails) => {
    try {
      console.log('Sende Abo-Bestätigungs-E-Mail an:', userData.email);
      // Hier später die echte E-Mail-Versand-Logik implementieren
      return {
        success: true,
        message: 'Abo-Bestätigungs-E-Mail erfolgreich gesendet'
      };
    } catch (error) {
      console.error('Fehler beim Senden der Abo-Bestätigungs-E-Mail:', error);
      throw new Error('E-Mail konnte nicht gesendet werden');
    }
  },

  sendContactFormEmail: async (formData) => {
    try {
      console.log('Sende Kontaktformular-E-Mail von:', formData.email);
      // Hier später die echte E-Mail-Versand-Logik implementieren
      return {
        success: true,
        message: 'Kontaktformular-E-Mail erfolgreich gesendet'
      };
    } catch (error) {
      console.error('Fehler beim Senden der Kontaktformular-E-Mail:', error);
      throw new Error('E-Mail konnte nicht gesendet werden');
    }
  },

  // Admin-Benachrichtigungen
  sendAdminNotification: async (type, data) => {
    try {
      console.log('Sende Admin-Benachrichtigung:', type, data);
      // Hier später die echte E-Mail-Versand-Logik implementieren
      return {
        success: true,
        message: 'Admin-Benachrichtigung erfolgreich gesendet'
      };
    } catch (error) {
      console.error('Fehler beim Senden der Admin-Benachrichtigung:', error);
      throw new Error('E-Mail konnte nicht gesendet werden');
    }
  }
};

export default emailService;
