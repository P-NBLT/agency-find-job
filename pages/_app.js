import ThemeProvider from "../Context/ThemeProvider/ThemeProvider";
import FilterProvider from "../Context/FilterProvider/FilterProvider";
import AgenciesProvider from "../Context/AgenciesProvider/AgenciesProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <AgenciesProvider>
        <FilterProvider>
          <Component {...pageProps} />
        </FilterProvider>
      </AgenciesProvider>
    </ThemeProvider>
  );
}

export default MyApp;
