import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import { FilterNav, Header } from "../component/molecules";
import { useTheme } from "../Context/ThemeProvider/ThemeProvider";
import ModalProvider from "../Context/ModalProvider/ModalProvider";
import PaginationProvider from "../Context/PaginationProvider/PaginationProvider";
import { ContentResult } from "../component/organism";
import prisma from "../util/prisma";
import { useAgencies } from "../Context/AgenciesProvider/AgenciesProvider";
import MapProvider from "../Context/MapProvider/MapProvider";
import { Button } from "../component/atoms";
import { useRouter } from "next/router";
export async function getServerSideProps() {
  const agencies = await prisma.agency.findMany();

  const cities = await prisma.city.findMany();
  const coord = [];
  cities.map((city) =>
    coord.push({
      lat: city.latitude,
      lon: city.longitude,
      count: city.count,
      name: city.city,
    })
  );

  return {
    props: {
      initialAgencies: agencies,
      cities: coord,
    },
  };
}

export default function Home({ cities, initialAgencies }) {
  const getAgencies = useAgencies().handleAgenciesFromServer;
  const darkTheme = useTheme();
  const router = useRouter();
  const BODY_STYLE = {
    backgroundColor: darkTheme ? "var(--midnight)" : "#F2F2F2",
  };
  useEffect(() => {
    getAgencies(initialAgencies);
  });

  return (
    <div style={BODY_STYLE} className={styles.padding}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <ModalProvider>
        <MapProvider>
          <PaginationProvider>
            <FilterNav />
            <ContentResult cities={cities} />
          </PaginationProvider>
        </MapProvider>
      </ModalProvider>

      <div className={styles.paginationButton}></div>
    </div>
  );
}
