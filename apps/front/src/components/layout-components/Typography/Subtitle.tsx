import { Typography } from "@mui/material";

type SubtitleTypes = {
  //size: "16px" | "14px"
  variant: "subtitle1" | "subtitle2";
  content: string;
};

export default function Subtitle({ variant, content }: SubtitleTypes) {
  return (
    <>
      <Typography variant={variant} display="block">
        {content}
      </Typography>
    </>
  );
}
