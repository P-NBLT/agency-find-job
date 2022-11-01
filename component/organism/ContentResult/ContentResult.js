import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import styles from "./ContentResult.module.css";
import stylesCard from "../../molecules/Card/Card.module.css";
import { Card, Modal } from "../../molecules";
import { Button } from "../../atoms";
import { usePagination } from "../../../Context/PaginationProvider/PaginationProvider";
import { useModal } from "../../../Context/ModalProvider/ModalProvider";
import { useAgencies } from "../../../Context/AgenciesProvider/AgenciesProvider";
import {
  useData,
  useFilter,
} from "../../../Context/FilterProvider/FilterProvider";

const DynamicHeader = dynamic(() => import("../../molecules/Map/Maps.jsx"), {
  ssr: false,
});

const ContentResult = ({ cities, ...props }) => {
  const pagination = usePagination();
  // add
  const pages = usePagination().pages;
  const cards = usePagination().cards;
  const data = useData();
  const modal = useModal();
  const filter = useFilter();
  const keyword = useFilter().keywords;
  const modalDeleteAgencyId = useModal().modalDeleteAgencyId;
  const getAgencies = useAgencies().handleAgenciesFromServer;
  const agencies = useAgencies().agencies;
  const setModalDeleteAgencyId = useModal().handleModalDeleteAgencyId;

  const [arrData, setArrData] = useState();
  const [maxPages, setMaxPages] = useState(0);
  useEffect(() => {
    if (agencies) {
      setMaxPages(agencies.length / 20);
      if (!keyword) return setArrData(agencies);
      return filter.submitFilterInput;
    }
  }, [agencies]);

  useEffect(() => {
    if (data?.agencies) {
      setMaxPages(data.agencies.length / 20);
      return setArrData(data?.agencies);
    }
  }, [data]);

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
    modal.toggleModal("delete");
    setModalDeleteAgencyId(id);
  }

  async function sendDeleteRequest(e) {
    const id = e.target.id;

    const res = await fetch(`../../api/agencies/${id}/delete`, {
      method: "DELETE",
    });
    console.log(res);
    const json = await res.json();
    console.log(json);
    if (res.ok) {
      modal.toggleModal("delete");
      const agencyListing = await fetch(`../../api/agencies/`, {
        method: "GET",
      });
      if (json.authorisation) {
        const renderedAgencies = await agencyListing.json();
        return getAgencies(renderedAgencies);
      }
    }
  }

  return (
    <>
      <DynamicHeader cities={cities} />{" "}
      {modal.modalId === "delete" && (
        <Modal>
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
        </Modal>
      )}
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
            onClick={() => {
              console.log("pages", pages, "max pages", maxPages);
              pagination.decrementPage();
            }}
          >
            {`<<`}
          </Button>
          <Button
            variant="primary"
            size="small"
            onClick={() => {
              console.log("pages", pages, "max pages", maxPages);
              if (pages < maxPages - 1) {
                pagination.incrementPage();
              }
            }}
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
