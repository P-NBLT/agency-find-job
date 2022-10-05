import ThemeProvider from "../Context/ThemeProvider/ThemeProvider";
import FilterProvider from "../Context/FilterProvider/FilterProvider";
import AgenciesProvider from "../Context/AgenciesProvider/AgenciesProvider";
import LoginProvider from "../Context/LoginProvider/LoginProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <AgenciesProvider>
        <FilterProvider>
          <LoginProvider>
            <Component {...pageProps} />
          </LoginProvider>
        </FilterProvider>
      </AgenciesProvider>
    </ThemeProvider>
  );
}

export default MyApp;
