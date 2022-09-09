import React from "react";
import PropTypes from "prop-types";
import styles from "./FilterNav.module.css";
import modalStyles from "../Modal/ModalFilterOptions/ModalFilterOptions.module.css";
import { Button, InputFilterNav, RadioCheckbox } from "../../atoms";
import { FiFilter } from "react-icons/fi";
import { ImSearch } from "react-icons/im";
import { FaMapMarkerAlt } from "react-icons/fa";
import { classNameBuilderHelper } from "../../../util/functionHelper";
import {
  useTheme,
  useToggle,
} from "../../../Context/ThemeProvider/ThemeProvider";
import { useFilter } from "../../../Context/FilterProvider/FilterProvider";
import { useModal } from "../../../Context/ModalProvider/ModalProvider";
import ModalFilterOptions from "../Modal/ModalFilterOptions/ModalFilterOptions";

const FilterNav = ({ children, variant, ...props }) => {
  const classNames = classNameBuilderHelper([variant], styles);
  const darkTheme = useTheme();
  const filter = useFilter();
  const modal = useModal();
  console.log(modal);
  function sendFilterInput() {
    filter.submitFilterInput();
  }

  function openModal() {
    modal.toggleModal();
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
          <RadioCheckbox id="size" value="1-10" />
          <RadioCheckbox id="size" value="11-50" />
          <RadioCheckbox id="size" value="51-100" />
          <RadioCheckbox id="size" value="GT-100" />
        </div>
        <Button
          variant="primary"
          size="medium"
          margin="mgModal-r-l"
          onClick={sendFilterInput}
        >
          Confirm
        </Button>
      </ModalFilterOptions>
      <div className={styles.container}>
        <div className={styles.noMobile} style={BACKGROUND_FIELD}>
          <ImSearch className={styles.searchPic} />
          <InputFilterNav
            placeholder="Filter by name..."
            variant="primary"
            id="name"
          />
          <FaMapMarkerAlt className={styles.mapPic} />
          <InputFilterNav
            placeholder="Filter by location..."
            variant="secondary"
            id="city"
          />
          <Button variant="filterOption" size="mediumPlus" theme={darkTheme}>
            <FiFilter className={styles.filterPic} /> More Options
          </Button>
          <Button variant="primary" size="small" onClick={sendFilterInput}>
            Search
          </Button>
        </div>
      </div>
      {/* mobile */}
      <div className={styles.mobileContainer}>
        <div className={styles.mobile} style={BACKGROUND_FIELD}>
          <InputFilterNav
            id="city"
            placeholder="Filter by city..."
            variant="mobile"
          />
          <Button
            variant="fitContent"
            style={{ marginRight: "24px" }}
            onClick={openModal}
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
