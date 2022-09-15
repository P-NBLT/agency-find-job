import PropTypes from "prop-types";
import styles from "./ContentResult.module.css";
import { Card } from "../../molecules";
import { Button } from "../../atoms";
import { usePagination } from "../../../Context/PaginationProvider/PaginationProvider";

const ContentResult = ({ ...props }) => {
  const pagination = usePagination();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Card />
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
  );
};

ContentResult.propTypes = {};

export default ContentResult;
