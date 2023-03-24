import { Button, Divider, Link, Paper, Typography } from "@mui/material";

Settings.title = "Settings";
Settings.requireLogin = false;

const ISSUE_TEMPLATE = encodeURIComponent(`
## Problems with the dapp

### Description
- [ ] problem 1
- [ ] ...

### How to reproduce the bug
...

### App info, for the devs
${"```"}
Version: ${process.env.PACKAGE_VERSION}
Commit: ${process.env.LATEST_COMMIT_HASH}
${"```"}
`);

const DAPP_ISSUES_URL = "https://github.com/NeokingdomDAO/dapp/issues/new";

export default function Settings() {
  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        App information
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1">Version: {process.env.PACKAGE_VERSION}</Typography>
        <Typography variant="body1">
          Build:{" "}
          <Link href={process.env.GITHUB_REPO} target="_blank">
            {process.env.LATEST_COMMIT_HASH}
          </Link>{" "}
        </Typography>
      </Paper>
      <Divider sx={{ mt: 3, mb: 3 }} />
      <Button
        color="primary"
        variant="contained"
        href={`${DAPP_ISSUES_URL}?title=Dapp bug&body=${ISSUE_TEMPLATE}&projects=NeokingdomDAO/1&labels=bug`}
        target="_blank"
      >
        Report an issue
      </Button>
    </>
  );
}
