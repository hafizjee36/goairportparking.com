// FAQItem.jsx
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function FAQItem({ q, a, expanded, panel, onChange }) {
  return (
    <Accordion
      expanded={expanded === panel}
      onChange={onChange(panel)}
      disableGutters
      square={false}
      sx={{
        borderRadius: 1.5,
        bgcolor: "grey.50",
        border: "1px solid",
        borderColor: "grey.200",
        boxShadow: "none",
        "&:before": { display: "none" },
        // border: "1px solid black"
      }}
    >
      <AccordionSummary
        expandIcon={
          <Box sx={{ display: "inline-flex", alignItems: "center" }}>
            <AddIcon className="add" fontSize="small" />
            <RemoveIcon className="remove" fontSize="small" />
          </Box>
        }
        sx={{
          // border: "1px dashed green",
          px: 1.25,
          "& .MuiAccordionSummary-content": { my: 1 },
          "& .remove": { display: "none" },
          "&.Mui-expanded .add": { display: "none" },
          "&.Mui-expanded .remove": { display: "inline-flex" },
          "& .faq-question": {
            fontSize: "0.95rem",
            fontWeight: 500,
            color: "text.secondary",
          },
          "&.Mui-expanded .faq-question": {
            fontSize: "1rem",
            fontWeight: 700,
            color: "text.primary",
          },
        }}
      >
        <Typography className="faq-question">{q}</Typography>
      </AccordionSummary>

      <AccordionDetails sx={{ pt: 0, mb: 1.5, px: 1.25 }}>
        <Typography variant="subtitle2" color="text.secondary">
          {a}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}
