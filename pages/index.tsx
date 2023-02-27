import Typography from "@mui/material/Typography";

Home.renderOnServer = false;
Home.requireLogin = true;

export default function Home() {
  if (process.env.NEXT_PUBLIC_PROJECT_KEY === "neokingdom")
    return <Typography variant="h3">Neokingdom dashboard</Typography>;
  if (process.env.NEXT_PUBLIC_PROJECT_KEY === "teledisko")
    return <Typography variant="h3">Teledisko dashboard</Typography>;
}
