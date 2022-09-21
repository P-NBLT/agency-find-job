import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import { FilterNav, Header } from "../component/molecules";
import { useTheme } from "../Context/ThemeProvider/ThemeProvider";
import ModalProvider from "../Context/ModalProvider/ModalProvider";
import PaginationProvider from "../Context/PaginationProvider/PaginationProvider";
import { ContentResult } from "../component/organism";
import { PrismaClient } from "@prisma/client";
import { useAgencies } from "../Context/AgenciesProvider/AgenciesProvider";

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  const agencies = await prisma.agency.findMany();
  return {
    props: {
      initialAgencies: agencies,
    },
  };
}

export default function Home({ initialAgencies }) {
  const getAcencies = useAgencies().handleAgenciesFromServer;
  const darkTheme = useTheme();
  const BODY_STYLE = {
    backgroundColor: darkTheme ? "var(--midnight)" : "#F2F2F2",
  };

  useEffect(() => {
    getAcencies(initialAgencies);
  }, [initialAgencies]);

  return (
    <div style={BODY_STYLE} className={styles.padding}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <ModalProvider>
        <FilterNav />
      </ModalProvider>

      <PaginationProvider>
        <ContentResult />
      </PaginationProvider>

      <div className={styles.paginationButton}></div>
    </div>
  );
}
