import PropTypes from "prop-types";
import styles from "./ContentResult.module.css";
import stylesCard from "../../molecules/Card/Card.module.css";
import { Card } from "../../molecules";
import { Button } from "../../atoms";
import { usePagination } from "../../../Context/PaginationProvider/PaginationProvider";
import { ModalDeleteAgency } from "../../molecules";
import { useModal } from "../../../Context/ModalProvider/ModalProvider";
import { useAgencies } from "../../../Context/AgenciesProvider/AgenciesProvider";
import {
  useData,
  useFilter,
} from "../../../Context/FilterProvider/FilterProvider";

const ContentResult = ({ ...props }) => {
  const pagination = usePagination();
  // add
  const pages = usePagination().pages;
  const cards = usePagination().cards;
  const data = useData();
  const modal = useModal();
  const filter = useFilter();
  const modalDeleteAgencyId = useModal().modalDeleteAgencyId;
  const getAgencies = useAgencies().handleAgenciesFromServer;
  const setModalDeleteAgencyId = useModal().handleModalDeleteAgencyId;
  const modalId = "delete";

  let arrData = data ? data.agencies : null;

  let res = [];
  if (arrData) {
    for (let index = pages * 20; index < arrData.length; index++) {
      if (index < 20 * (cards + 1)) {
        res.push(
          <div key={arrData[index].name} className={stylesCard.card}>
            <Card
              href={arrData[index].website}
              img={arrData[index].logo}
              labelName={arrData[index].name}
              labelRegion={arrData[index].region}
              labelCity={arrData[index].city}
              labelSize={arrData[index].size}
              labelWebsite={arrData[index].website}
              id={arrData[index].id}
              fun={{ handleModal }}
            />
          </div>
        );
      }
    }
  } else res = <p>Error</p>;

  function handleModal(id) {
    modal.toggleModal(modalId);
    setModalDeleteAgencyId(id);
  }

  async function sendDeleteRequest(e) {
    const id = e.target.id;

    const res = await fetch(`../../api/agencies/${id}/delete`, {
      method: "DELETE",
    });
    if (res.ok) {
      modal.toggleModal(modalId);
      const agencyListing = await fetch(`../../api/agencies/`, {
        method: "GET",
      });
      if (agencyListing.ok) {
        const renderedAgencies = await agencyListing.json();
        getAgencies(renderedAgencies);
        setTimeout(() => filter.submitFilterInput(renderedAgencies), 1);
      }
    }
  }

  return (
    <>
      {" "}
      <ModalDeleteAgency>
        <Button
          onClick={sendDeleteRequest}
          id={modalDeleteAgencyId}
          variant="primary"
          size="medium"
        >
          Yes
        </Button>
        <Button variant="primary" size="medium" onClick={modal.toggleModal}>
          Ooops.. no
        </Button>
      </ModalDeleteAgency>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className={stylesCard.cardContainer}>{res}</div>
        <div className={styles.paginationButton}>
          <Button
            variant="primary"
            size="small"
            onClick={pagination.decrementPage}
          >
            {`<<`}
          </Button>
          <Button
            variant="primary"
            size="small"
            onClick={pagination.incrementPage}
          >
            {`>>`}
          </Button>
        </div>
        <div className={styles.loadmore}>
          <Button
            variant="primary"
            size="medium"
            onClick={pagination.loadMoreCards}
          >
            Load More
          </Button>
        </div>
      </div>
    </>
  );
};

ContentResult.propTypes = {};

export default ContentResult;
