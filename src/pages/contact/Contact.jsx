import { Grid, Box } from "@mui/material";

import PageWrapper from "../../components/reusable/PageWrapper";
import HeroSection from "../../components/reusable/HeroSection";
import Seo from "../../components/reusable/Seo";
import contactUs from "../../assets/optimized/contactUs.webp";
import theme from "../../theme";
import Form from "./components/Form";
import Map from "./components/Map";
import ContactItem from "./components/ContactItem";

import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export const contactData = [
  {
    id: 1,
    text: "support@goairportparking.com",
    icon: (
      <EmailIcon sx={{ color: theme.palette.primary.main, fontSize: 22 }} />
    ),
    link: "mailto:support@goairportparking.com",
  },
  {
    id: 2,
    text: "71-75 Shelton Street, Covent Garden, London, United Kingdom, WC2H 9JQ",
    icon: (
      <LocationOnIcon
        sx={{ color: theme.palette.primary.main, fontSize: 22 }}
      />
    ),
  },
  {
    id: 3,
    text: "Company number:16748588",
    icon: (
      <ConfirmationNumberIcon
        sx={{ color: theme.palette.primary.main, fontSize: 22 }}
      />
    ),
  },
  {
    id: 4,
    text: "Customer Service Number +44 2039 749748",
    icon: (
      <PhoneIcon sx={{ color: theme.palette.primary.main, fontSize: 22 }} />
    ),
    link: "tel:+442039749748",
  },
  {
    id: 5,
    text: "CLOUDAINAIRE MANAGEMENT CONSULTANCY LLC",
    icon: (
      <BusinessIcon sx={{ color: theme.palette.primary.main, fontSize: 22 }} />
    ),
  },
];

const Contact = () => {
  return (
    <>
      <Seo 
        title="Contact Go Airport Parking | Help, Support & Enquiries"
        description="Need help with your booking or have a question? Contact Go Airport Parking for quick support, enquiries, and assistance with your parking plans."
        keywords={["contact go airport parking","customer support","parking help","get in touch"]}
      />
      <HeroSection
        title="Lets Get In Touch"
        subtitle="We'd love to hear from you! Reach out with any questions, ideas, or feedback — we're here to help you."
        image={contactUs}
      />

      <Box sx={{ backgroundColor: theme.palette.background.default }}>
        <PageWrapper>
          <Grid container spacing={2} sx={{ my: 8, px: 2 }}>
            {contactData.map((item) => (
              <Grid
                size={{
                  xs: 12,
                  md: 4,
                }}
                key={item.id}
              >
                {item.link ? (
                  <a
                    href={item.link}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ContactItem icon={item.icon} text={item.text} />
                  </a>
                ) : (
                  <ContactItem icon={item.icon} text={item.text} />
                )}
              </Grid>
            ))}
          </Grid>

          {/* <Container maxWidth="lg" sx={{ py: 4 }}> */}
          <Grid container spacing={4} sx={{ mb: 8, px: 2 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Form />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              {/* <Map mapQuery="Birmingham Airport" mapZoom={15} /> */}
            </Grid>
          </Grid>
          {/* </Container> */}
        </PageWrapper>
      </Box>
    </>
  );
};

export default Contact;
