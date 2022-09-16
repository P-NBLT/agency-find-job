import styles from "./Card.module.css";
import { InfoCard, Image } from "../../atoms";
import { useTheme } from "../../../Context/ThemeProvider/ThemeProvider";
import { useData } from "../../../Context/FilterProvider/FilterProvider";
import { usePagination } from "../../../Context/PaginationProvider/PaginationProvider";
const Card = (props) => {
  const darkTheme = useTheme();
  const pages = usePagination().pages;
  const cards = usePagination().cards;

  const data = useData();
  const CARD_STYLE = {
    backgroundColor: darkTheme ? "var(--dark-blue)" : "white",
  };

  let arrData = data ? data.agencies : null;
  let res = [];
  if (arrData) {
    for (let index = pages * 20; index < arrData.length; index++) {
      if (index < 20 * (cards + 1)) {
        res.push(
          <a
            key={arrData[index].name}
            className={styles.card}
            style={CARD_STYLE}
            href={arrData[index].website}
            target="_blank"
          >
            <Image img={arrData[index].logo} />

            <InfoCard
              label={arrData[index].name}
              variant="text"
              margin="mg-t-l"
            />
            <InfoCard
              label={arrData[index].region}
              variant="text"
              margin="mg-l"
            />

            <InfoCard
              label={arrData[index].city}
              variant="text"
              margin="mg-l"
            />
            <InfoCard
              label={arrData[index].size}
              variant="text"
              margin="mg-l"
            />
            <InfoCard
              label={arrData[index].website}
              variant="city"
              margin="mg-t-b-l"
            />
          </a>
        );
      }
    }
  } else res = <p>Error</p>;

  return (
    <>
      <div className={styles.cardContainer}>{res}</div>
    </>
  );
};

Card.propTypes = {};

export default Card;
