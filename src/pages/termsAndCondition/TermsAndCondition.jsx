// TermsAndCondition.jsx
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import HeroSection from "../../components/reusable/HeroSection";
import PageWrapper from "../../components/reusable/PageWrapper";
import Seo from "../../components/reusable/Seo";
import tnc from "../../assets/optimized/tnc.webp";

// animations
import AnimateOnScroll from "../../components/reusable/AnimateOnScroll";
import {
  EASE_SOFT,
  THRESHOLD,
  ROOT_MARGIN,
  smoothStyle,
} from "../../components/utils/animation";

export default function TermsAndCondition() {
  const sections = [
    {
      title: "Booking Conditions",
      bullets: [
        {
          heading: "Confirmation Voucher",
          body: "Go Airport Parking LTD. will make every reasonable effort to email your confirmation voucher to the address provided. If you do not receive it, you must contact us immediately. Failure to attend without cancellation, or cancellations within 24 hours of the booking date, will result in no refund.",
        },
        {
          heading: "Payment Policy",
          body: "By booking, you authorize Go Airport Parking LTD. to charge your card for the full amount. You are responsible for ensuring your payment details are correct and up to date. Payment disputes must be reported within 24 hours of the transaction.",
        },
        {
          heading: "Agency Role",
          body: "Go Airport Parking LTD. acts as an agent for car parks and is not responsible for operating the car parks. We accept liability for proven processing errors or negligence, provided claims are submitted before the vehicle leaves the car park.",
        },
        {
          heading: "Car Park Responsibility",
          body: "The car park operator is liable for any proven negligence on their part. Claims will not be considered once your vehicle has left the premises. You must check your vehicle before departure.",
        },
        {
          heading: "Refund & Cancellation Policy",
          body: "Cancellations made more than 48 hours before the scheduled parking time are eligible for a refund, subject to a £15.00 administrative fee. Non-refundable bookings, including special offers and promotional rates, are not eligible for refunds.",
        },
      ],
    },
    {
      title: "Complaints Procedure",
      bullets: [
        {
          heading: "Submission of Complaints",
          body: "All complaints must be submitted in writing with full details of the issue within 24 hours of your return.",
        },
        {
          heading: "Response Time",
          body: "Complaints will be acknowledged and responded to within 5 business days, unless delays are communicated.",
        },
        {
          heading: "Dispute Resolution",
          body: "Disputes regarding charges or services must be reported within 48 hours of the issue. Any claims relating to car park damages must be submitted before leaving the car park or terminal.",
        },
        {
          heading: "Data Protection",
          body: "We comply with applicable data protection laws, including GDPR. Your information is used solely for booking, payment, and customer support purposes, and is shared with third parties only where necessary to provide the service.",
        },
        {
          heading: "Chargebacks and Payment Disputes",
          body: "If you initiate a chargeback with your card issuer (Visa/Mastercard), you must also notify Go Airport Parking LTD. immediately. Failure to do so may delay resolution.",
        },
      ],
    },
    {
      title: "Limitation of Liability",
      bullets: [
        {
          heading: "Role as Booking Agent",
          body: "Go Airport Parking LTD. operates solely as a booking agent and does not own, operate, or control the services offered. You are bound by both our terms and the service provider’s terms. Your contract for service delivery is with the provider.",
        },
        {
          heading: "Limited Liability",
          body: "We are liable only for direct losses resulting from our own negligence in processing bookings. We are not liable for acts, omissions, or negligence of service providers, including vehicle damage, theft, or delays.",
        },
        {
          heading: "Claims Against Service Providers",
          body: "Any claims related to the delivery of car parking services, including loss or damage, must be made directly against the service provider under its terms and conditions.",
        },
        {
          heading: "Vehicles at Owner’s Risk",
          body: "Vehicles are parked entirely at the owner’s risk. We do not accept liability for loss or damage to vehicles or their contents. Remove valuables and ensure adequate insurance coverage.",
        },
        {
          heading: "Duplicate Liability Clause",
          body: "We offer no guarantee or indemnity for the safety of vehicles or their contents. Vehicle owners must rely on their own insurance policies for claims arising from loss or damage while the vehicle is in the car park.",
        },
        {
          heading: "Maximum Liability",
          body: "Our total liability is limited to the amount paid for the booking, including parking and booking fees. We accept no responsibility for consequential losses, including loss of profit, revenue, enjoyment, or additional costs. Secure adequate travel insurance.",
        },
        {
          heading: "Repeated Warranty Disclaimer",
          body: "We do not guarantee the security or protection of vehicles or contents left in car parks. Owners must use their own insurance policies to make claims for any such losses.",
        },
        {
          heading: "Accuracy of Information",
          body: "Information on services is based on details supplied by service providers. While we strive for accuracy, we cannot guarantee or continuously verify all information. Inaccuracies will be updated promptly. Confirm details with the provider before booking.",
        },
        {
          heading: "Service Provider Standards",
          body: "We do not endorse, inspect, or guarantee the standards or practices of service providers. Verify details directly with the provider before completing a booking.",
        },
      ],
    },
    {
      title: "Data Protection and Privacy",
      bullets: [
        {
          heading: "Data Collection",
          body: "We collect personal information required to process your booking, including name, email, vehicle details, and payment information. This data is securely stored and shared only with the service provider.",
        },
        {
          heading: "Data Security",
          body: "We use secure servers and encryption to protect your data. Payment details are handled by compliant third-party payment gateways, and no card details are stored on our systems.",
        },
        {
          heading: "Customer Rights",
          body: "You have the right to access, amend, or request deletion of your personal data at any time. Please refer to our Privacy Policy for further details.",
        },
      ],
    },
    {
      title: "Governing Law and Jurisdiction",
      bullets: [
        {
          heading: "Governing Law",
          body: "These Terms and Conditions are governed by the laws of the United Kingdom.",
        },
        {
          heading: "Jurisdiction",
          body: "All disputes arising under these Terms and Conditions are subject to the exclusive jurisdiction of the courts of England and Wales.",
        },
      ],
    },
  ];

  const BASE = 120; // base delay for first section
  const STEP = 100; // per-section stagger
  const ITEM_STEP = 60; // per-bullet stagger

  return (
    <>
      <HeroSection
        title="Terms & Conditions – Go Airport Parking LTD"
        subtitle="These Terms & Conditions govern all bookings made with Go Airport Parking LTD. By booking with us, you agree to the following terms."
        image={tnc}
      />

      <PageWrapper>
        <Box sx={{ my: { xs: 3, md: 5 } }}>
          {/* Heading block */}
          <AnimateOnScroll
            type="zoom-in"
            duration={720}
            delay={40}
            easingTransform={EASE_SOFT}
            easingOpacity={EASE_SOFT}
            threshold={THRESHOLD}
            rootMargin={ROOT_MARGIN}
            once
            style={smoothStyle}
          >
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
              Introduction
            </Typography>
          </AnimateOnScroll>

          <AnimateOnScroll
            type="fade"
            duration={680}
            delay={110}
            easingTransform={EASE_SOFT}
            easingOpacity={EASE_SOFT}
            threshold={THRESHOLD}
            rootMargin={ROOT_MARGIN}
            once
            style={smoothStyle}
          >
            <Typography variant="subtitle2" color="text.secondary">
              These Terms and Conditions govern your use of goairportparking.com
              (the “Website”). By using this Website, you agree to be bound
              fully by these Terms and Conditions, which include the terms of
              the relevant service providers, cancellation policies, and our
              stated liabilities. The Website offers a variety of parking
              options, ranging from premium to budget-friendly. However, our
              primary focus is on providing low-cost services. To maintain
              competitive pricing, Customers must understand and accept that our
              Terms and Conditions are structured to keep costs affordable and
              within defined limits. The Website functions solely as a booking
              agent for service providers listed on the platform. It does not
              itself operate or provide car parking services. Before purchasing,
              you must carefully read and understand all information regarding
              the selected service provider, including their specific terms. Any
              questions or concerns about the service must be raised before
              committing to a booking. If any part of these Terms is found to be
              unenforceable, the remaining provisions shall continue to apply in
              full. The Website reserves the right to amend these Terms at any
              time. However, once a booking is made, the Terms that apply are
              those in effect on the Website at the time of booking. We
              recommend reviewing these Terms before confirming your
              reservation. For pre-booking queries, please contact us at
              support@goairportparking.com or call between 08:00 and 00:00
              (daily, excluding bank holidays).
            </Typography>
          </AnimateOnScroll>

          <AnimateOnScroll
            type="fade"
            duration={600}
            delay={160}
            easingTransform={EASE_SOFT}
            easingOpacity={EASE_SOFT}
            threshold={THRESHOLD}
            rootMargin={ROOT_MARGIN}
            once
            style={smoothStyle}
          >
            <Divider sx={{ my: 3 }} />
          </AnimateOnScroll>

          {/* Sections */}
          {sections.map((section, idx) => {
            const sectionDelay = BASE + idx * STEP;
            const sectionNo = idx + 1;

            return (
              <Box key={section.title} sx={{ mb: 4 }}>
                <AnimateOnScroll
                  type="slide-up"
                  distance={16}
                  duration={700}
                  delay={sectionDelay}
                  easingTransform={EASE_SOFT}
                  easingOpacity={EASE_SOFT}
                  threshold={THRESHOLD}
                  rootMargin={ROOT_MARGIN}
                  once
                  style={smoothStyle}
                >
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    {`Section ${sectionNo}: ${section.title}`}
                  </Typography>
                </AnimateOnScroll>

                <List
                  dense
                  sx={{
                    "& .MuiListItem-root": {
                      alignItems: "flex-start",
                      py: 0.75,
                    },
                    "& .MuiListItemText-primary": { fontSize: 14 },
                    pl: 0,
                  }}
                >
                  {section.bullets.map((b, i) => {
                    const itemNo = `${sectionNo}.${i + 1}`;
                    return (
                      <AnimateOnScroll
                        key={`${section.title}-${i}`}
                        type="fade"
                        duration={560}
                        delay={sectionDelay + (i + 1) * ITEM_STEP}
                        easingTransform={EASE_SOFT}
                        easingOpacity={EASE_SOFT}
                        threshold={THRESHOLD}
                        rootMargin={ROOT_MARGIN}
                        once
                        as="div"
                        style={smoothStyle}
                      >
                        <ListItem
                          disableGutters
                          sx={{ display: "flex", gap: 1.25 }}
                        >
                          {/* Number */}
                          <Typography
                            component="span"
                            sx={{ fontWeight: 600, minWidth: 56 }}
                          >
                            {itemNo}
                          </Typography>

                          {/* Content */}
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography
                              component="span"
                              sx={{ fontWeight: 700 }}
                            >
                              {b.heading}
                            </Typography>
                            <Typography
                              component="span"
                              color="text.secondary"
                              sx={{ ml: 0.5 }}
                            >
                              — {b.body}
                            </Typography>
                          </Box>
                        </ListItem>
                      </AnimateOnScroll>
                    );
                  })}
                </List>

                <AnimateOnScroll
                  type="fade"
                  duration={520}
                  delay={
                    sectionDelay + ITEM_STEP * (section.bullets.length + 1)
                  }
                  easingTransform={EASE_SOFT}
                  easingOpacity={EASE_SOFT}
                  threshold={THRESHOLD}
                  rootMargin={ROOT_MARGIN}
                  once
                  style={smoothStyle}
                >
                  <Divider sx={{ mb: 2 }} />
                </AnimateOnScroll>
              </Box>
            );
          })}
        </Box>
      </PageWrapper>
    </>
  );
}
