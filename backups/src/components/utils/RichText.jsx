import { Box } from "@mui/material";

export default function RichHtml({ html }) {
  return <Box dangerouslySetInnerHTML={{ __html: html }} />;
}
