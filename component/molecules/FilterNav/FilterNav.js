import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./FilterNav.module.css";
import modalStyles from "../Modal/ModalFilterOptions/ModalFilterOptions.module.css";
import { Button, InputFilterNav, RadioCheckbox } from "../../atoms";
import { FiFilter } from "react-icons/fi";
import { ImSearch } from "react-icons/im";
import { FaMapMarkerAlt } from "react-icons/fa";
import { classNameBuilderHelper } from "../../../util/functionHelper";
import { useTheme } from "../../../Context/ThemeProvider/ThemeProvider";
import { useFilter } from "../../../Context/FilterProvider/FilterProvider";
import { useModal } from "../../../Context/ModalProvider/ModalProvider";
import ModalFilterOptions from "../Modal/ModalFilterOptions/ModalFilterOptions";

const FilterNav = ({ children, variant, ...props }) => {
  const classNames = classNameBuilderHelper([variant], styles);
  const darkTheme = useTheme();
  const filter = useFilter();
  const modal = useModal();

  function sendFilterInput(e) {
    if (e.target.id == "modal") {
      filter.submitFilterInput();
      modal.toggleModal();
    } else filter.submitFilterInput();
  }

  function getInput(e) {
    let input = e.target.value;
    let id = e.target.id;
    filter.handleTextInput(input, id);
  }

  const BACKGROUND_FIELD = {
    backgroundColor: darkTheme ? "var(--dark-blue)" : "white",
  };
  const BACKGROUND_FILTER = {
    color: darkTheme ? "white" : "grey",
  };

  return (
    <>
      <ModalFilterOptions>
        <div className={modalStyles.radioContainer}>
          <p>Company size:</p>
          {["1-10", "11-50", "51-100", "GT-100"].map((option) => (
            <RadioCheckbox
              id={option}
              key={option}
              onChange={(e) => {
                filter.handleCheckbox(option, "size", e.target.checked);
              }}
              checked={filter.keywords?.size?.includes(option) || false}
            />
          ))}
        </div>
        <Button
          variant="primary"
          size="medium"
          onClick={sendFilterInput}
          id="modal"
        >
          Confirm
        </Button>
      </ModalFilterOptions>
      <div className={styles.container}>
        <div className={styles.noMobile} style={BACKGROUND_FIELD}>
          <ImSearch className={styles.searchPic} />
          <InputFilterNav
            placeholder={"Filter by name..."}
            variant="primary"
            id="name"
            onChange={getInput}
          />
          <FaMapMarkerAlt className={styles.mapPic} />
          <InputFilterNav
            placeholder="Filter by location..."
            variant="secondary"
            id="location"
            onChange={getInput}
          />
          <Button
            variant="filterOption"
            size="mediumPlus"
            theme={darkTheme}
            onClick={() => modal.toggleModal()}
          >
            <FiFilter className={styles.filterPic} /> More Options
          </Button>
          <Button variant="primary" size="small" onClick={sendFilterInput}>
            Search
          </Button>
        </div>
      </div>
      {/* mobile version below*/}
      <div className={styles.mobileContainer}>
        <div className={styles.mobile} style={BACKGROUND_FIELD}>
          <InputFilterNav
            id="city"
            placeholder="Filter by city..."
            variant="mobile"
            onChange={getInput}
          />
          <Button
            variant="fitContent"
            style={{ marginRight: "24px" }}
            onClick={() => modal.toggleModal()}
          >
            <FiFilter className={styles.filterPic} style={BACKGROUND_FILTER} />
          </Button>
          <Button variant="primary" size="small" onClick={sendFilterInput}>
            <ImSearch className={styles.searchPic} />
          </Button>
        </div>
      </div>
    </>
  );
};

FilterNav.propTypes = {};

export default FilterNav;
