import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";

export default function Home() {
  const theme = useTheme();
  console.log("theme: ", theme.palette.mode);
  return <Typography variant="h1">NKD home</Typography>;
}
