import ThemeProvider from "../Context/ThemeProvider/ThemeProvider";
import FilterProvider from "../Context/FilterProvider/FilterProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <FilterProvider>
        <Component {...pageProps} />
      </FilterProvider>
    </ThemeProvider>
  );
}

export default MyApp;
