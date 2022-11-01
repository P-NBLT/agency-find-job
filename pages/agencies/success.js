import { useEffect, useState } from "react";
import { Button } from "../../component/atoms";
import { useRouter } from "next/router";
import { Card } from "../../component/molecules";
import stylesCard from "../../component/molecules/Card/Card.module.css";
import styles from "../../styles/success.module.css";
import prisma from "../../util/prisma";

import { isRedirect } from "../../util/functionHelper";
export async function getServerSideProps({ req, res }) {
  const { headers } = req;
  const redirect = await isRedirect(headers);

  if (redirect === true) {
    return {
      redirect: {
        destination: "/check-in",
        permanent: false,
      },
    };
  }
  const dashboard = await prisma.dashboard.findMany();
  const sortedDashboard = await dashboard.sort((a, b) => b.id - a.id);

  const last = sortedDashboard[0];
  delete last.createdAt;
  delete last.updatedAt;

  return {
    props: {
      agency: last,
    },
  };
}

function Success({ agency }) {
  const router = useRouter();
  console.log("agency", agency);

  return (
    <div className={styles.successContainerMaster}>
      <div className={styles.successContainer}>
        <h3>Succesful request! Here is the new Card</h3>

        <div className={`${stylesCard.cardContainer}`}>
          {agency && (
            <Card
              isValid="notvisible"
              href={agency.website}
              img={agency.logo}
              labelName={agency.companyName}
              labelRegion={agency.region}
              labelCity={agency.city}
              labelSize={agency.size}
              labelWebsite={agency.website}
              id={agency.id}
            />
          )}
        </div>

        <div className={styles.redirectButton}>
          <Button
            onClick={() => router.push("/agencies/new")}
            padding="pd-small"
            variant="primary"
          >
            Add a new agency
          </Button>
          <Button
            onClick={() => router.push("/")}
            variant="primary"
            padding="pd-small"
          >
            Go back to the search page
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Success;
