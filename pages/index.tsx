import Section from "@components/Section";
import Header from "@components/dashboard/Header";

import Resolutions from "../components/dashboard/Resolutions";
import Tasks from "../components/dashboard/Tasks";

Home.renderOnServer = false;
Home.requireLogin = true;
Home.fullWidth = true;

export default function Home() {
  return (
    <>
      <Section
        sx={{ pt: 0 }}
        containerSx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
      >
        <Header />
      </Section>
      <Section inverse>
        <Resolutions />
      </Section>
      <Section>
        <Tasks />
      </Section>
    </>
  );
}
