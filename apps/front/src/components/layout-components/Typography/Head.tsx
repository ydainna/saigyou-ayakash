import { Typography } from "@mui/material";

type HeadTypes = {
  //size: "96px" | "60px" | "48px" | "34px" | "24px" | "20px"
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  content: string;
};

export default function Head({ variant, content }: HeadTypes) {
  return (
    <>
      <Typography variant={variant} display="block" gutterBottom>
        {content}
      </Typography>
    </>
  );
}
