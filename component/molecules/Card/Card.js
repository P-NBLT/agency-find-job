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
  const router = useRouter();
  const modal = useModal();
  const modalId = "delete";
  const CARD_STYLE = {
    backgroundColor: darkTheme ? "var(--dark-blue)" : "white",
    borderRadius: "6px",
  };

  const BUTTON_STYLE = {
    color: darkTheme ? "var(--dark-grey)" : "black",
  };

  async function handleIdForHandleModal(e) {
    const id = e.target.id;

    const isLogin = await fetch("../../api/auth/authenticate", {
      method: "GET",
    });
    const isLoginResponse = await isLogin.json();
    if (isLogin.status === 401 && !isLoginResponse.success)
      return router.push("/check-in");

    if (id) {
      props.fun.handleModal(id);
    }
  }

  return (
    <div style={CARD_STYLE}>
      <a href={props.href} target="_blank" style={{ textDecoration: "none" }}>
        <Image img={props.img} />

        <InfoCard label={props.labelName} variant="text" margin="mg-t-l" />
        <InfoCard label={props.labelRegion} variant="text" margin="mg-l" />

        <InfoCard label={props.labelCity} variant="text" margin="mg-l" />
        <InfoCard label={props.labelSize} variant="text" margin="mg-l" />
        <InfoCard label={props.labelWebsite} variant="website" margin="mg-l" />
      </a>
      <div
        className={`${styles.cardButton} ${styles[props.isValid]}`}
        id={props.id}
        style={BUTTON_STYLE}
      >
        <FiEdit
          id={props.id}
          onClick={async () => {
            console.log("sending request");
            const res = await fetch("../../api/auth/authenticate", {
              method: "GET",
            });
            const json = await res.json();
            console.log("json answer", json);
            if (json.message && res.status == 401) router.push("/check-in");
            if (json.success) router.push(`/agencies/${props.id}/edit`);
          }}
        />
        <BsTrash id={props.id} onClick={handleIdForHandleModal} />
      </div>
    </div>
  );
};

Card.propTypes = {};

export default Card;
