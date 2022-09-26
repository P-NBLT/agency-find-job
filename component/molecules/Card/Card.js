import styles from "./Card.module.css";
import { InfoCard, Image, Button } from "../../atoms";
import { useTheme } from "../../../Context/ThemeProvider/ThemeProvider";
import {
  useData,
  useFilter,
} from "../../../Context/FilterProvider/FilterProvider";
import { usePagination } from "../../../Context/PaginationProvider/PaginationProvider";
import { FiEdit } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import { useRouter } from "next/router";
import { ModalDeleteAgency } from "..";
import { useModal } from "../../../Context/ModalProvider/ModalProvider";
import { useAgencies } from "../../../Context/AgenciesProvider/AgenciesProvider";

const Card = (props) => {
  const darkTheme = useTheme();
  const pages = usePagination().pages;
  const cards = usePagination().cards;
  const router = useRouter();
  const data = useData();
  const filter = useFilter();
  const modal = useModal();
  const agencies = useAgencies();
  const agencyId = useAgencies().agencyCardId;
  const getAgencies = useAgencies().handleAgenciesFromServer;
  const modalId = "delete";
  const CARD_STYLE = {
    backgroundColor: darkTheme ? "var(--dark-blue)" : "white",
  };

  function handleModal(e) {
    const id = e.target.id;
    console.log("the idddd =", id);
    modal.toggleModal(modalId);
    agencies.handleCardId(id);
  }

  async function sendDeleteRequest(e) {
    const id = e.target.id;
    // console.log("from the aasync the id is =", id);
    const res = await fetch(`../../api/agencies/${id}/delete`, {
      method: "DELETE",
    });
    if (res.ok) {
      //const agencyListing = await res.json();
      modal.toggleModal(modalId);
      // getAgencies(agencyListing);
      const agencyListing = await fetch(`api/agencies/`, { method: "GET" });
      if (agencyListing.ok) {
      }
      filter.submitFilterInput();
    }
  }

  let arrData = data ? data.agencies : null;
  console.log(arrData);
  let res = [];
  if (arrData) {
    for (let index = pages * 20; index < arrData.length; index++) {
      if (index < 20 * (cards + 1)) {
        res.push(
          <div
            key={arrData[index].name}
            className={styles.card}
            style={CARD_STYLE}
          >
            <a href={arrData[index].website} target="_blank">
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
            <div className={styles.cardButton}>
              <FiEdit
                id={arrData[index].id}
                onClick={() =>
                  router.push(`/agencies/${arrData[index].id}/edit`)
                }
              />
              <BsTrash id={arrData[index].id} onClick={handleModal} />
            </div>
          </div>
        );
      }
    }
  } else res = <p>Error</p>;

  return (
    <>
      <ModalDeleteAgency>
        <Button onClick={sendDeleteRequest} id={agencyId}>
          Yes
        </Button>
        <Button>Ooops.. no</Button>
      </ModalDeleteAgency>
      <div className={styles.cardContainer}>{res}</div>
    </>
  );
};

Card.propTypes = {};

export default Card;
