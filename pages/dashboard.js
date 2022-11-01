import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  InfoBar,
  MenuItem,
  Logo,
  HeadersTable,
  Button,
} from "../component/atoms";
import { Table } from "../component/molecules";
import prisma from "../util/prisma";
import styles from "../styles/dashboard.module.css";
import { useLogin } from "../Context/LoginProvider/LoginProvider";
import { isRedirect } from "../util/functionHelper";

export async function getServerSideProps({ req, res }) {
  const { headers } = req;

  const redirect = await isRedirect(headers, true);

  if (typeof redirect === "object") {
    const user = await prisma.user.findUnique({
      where: {
        id: redirect.id,
      },
    });
    const isAdmin = await user.admin;

    if (!isAdmin)
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
  }
  if (redirect === true) {
    return {
      redirect: {
        destination: "/check-in",
        permanent: false,
      },
    };
  }

  const items = await prisma.dashboard.findMany();

  items.map((item) => {
    item.createdAt = JSON.stringify(item.createdAt);
    item.updatedAt = JSON.stringify(item.updatedAt);
    item.verified = JSON.stringify(item.verified);
  });

  return {
    props: {
      items,
    },
  };
}

const Dashboard = ({ items, ...props }) => {
  const [listItem, setListItem] = useState(items);
  const [toDelete, setToDelete] = useState([]);
  const [toConfirm, setToConfirm] = useState([]);
  const [idToFilter, setIdToFilter] = useState([]);
  const [acitveButton, setActiveButton] = useState(true);

  useEffect(() => {
    if ((toConfirm.length === 0) & (toDelete.length === 0))
      return setActiveButton(true);
    else return setActiveButton(false);
  }, [toDelete, toConfirm]);

  function addIdToFilter(id, action) {
    const findItem = listItem.find((el) => el.id === id);
    setIdToFilter((prev) => {
      return [...prev, id];
    });
    if (action === "delete")
      setToDelete((prev) => {
        return [...prev, findItem];
      });
    else if (action === "confirm")
      setToConfirm((prev) => {
        return [...prev, findItem];
      });
  }

  function removeIdToFilter(id, action) {
    setIdToFilter((prev) => prev.filter((el) => el != id));

    action === "delete"
      ? setToDelete((prev) => prev.filter((el) => el.id !== id))
      : setToConfirm((prev) => prev.filter((el) => el.id !== id));
  }

  async function processConfirmation() {
    // const checkAuth = await fetch("./api/auth/authenticate");
    // if (checkAuth.status === 200) {
    if (toDelete.length != 0) {
      const bodyData = formatData(toDelete);
      await handleRequest("DELETE", bodyData, 200, setToDelete);
    }

    if (toConfirm.length != 0) {
      const bodyData = formatData(toConfirm);
      await handleRequest("POST", bodyData, 201, setToConfirm);
    }

    const refreshDashboard = await fetch("./api/dashboard", {
      method: "GET",
    });

    if (refreshDashboard.status !== 200)
      return alert("Something went wrong while getting data");
    const newListing = await refreshDashboard.json();
    console.log(newListing);
    setListItem(newListing);
    setIdToFilter([]);
    // }
  }

  return (
    <div className={styles.masterContainer}>
      <div className={styles.menu}>
        <div style={{ height: "100px" }}></div>
        <MenuItem name="General" />
      </div>
      <div className={styles.dashboard}>
        <div className={styles.banner}>Dashboard</div>

        <div className={styles.dashboardContent}>
          <div className={styles.waiting}>
            <h3>Waiting for approval</h3>
            <Button
              variant="primary"
              size="xSmall"
              disabled={acitveButton}
              onClick={processConfirmation}
            >
              Save
            </Button>
          </div>

          <Table>
            {listItem
              .filter((item) => !idToFilter.includes(item.id))
              .map((item) => {
                return (
                  <InfoBar
                    userName={item.userName}
                    obj={item}
                    key={item.id}
                    action={["delete", "confirm"]}
                    fun={addIdToFilter}
                  />
                );
              })}
          </Table>

          {toDelete.length !== 0 && (
            <Table title="Item to delete">
              {toDelete.map((item) => {
                return (
                  <InfoBar
                    userName={item.userName}
                    obj={item}
                    key={item.id}
                    action={["delete"]}
                    label="cancel"
                    fun={removeIdToFilter}
                  />
                );
              })}
            </Table>
          )}
          {toConfirm.length !== 0 && (
            <Table title="Item to confirm">
              {toConfirm.map((item) => {
                return (
                  <InfoBar
                    userName={item.userName}
                    obj={item}
                    key={item.id}
                    action={["confirm"]}
                    label="cancel"
                    fun={removeIdToFilter}
                  />
                );
              })}
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;

function formatData(data) {
  const bodyData = [];
  for (let item of data) {
    const { companyName, city, region, size, website, logo, id } = item;
    bodyData.push({
      name: companyName,
      city,
      region,
      size,
      website,
      logo,
      id,
    });
  }
  console.log("bodydata", bodyData);
  return bodyData;
}

async function handleRequest(method, body, code, setState) {
  const res = await fetch("./api/dashboard", {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (res.status !== code) return alert(`something went wrong with ${method}`);
  if (res.status === code) {
    const json = await res.json();
    console.log(json, res);
    if (json.success) {
      setState([]);
    }
  }
}

// const res = await fetch("./api/agencies/dashboard", {
//     method: "DELETE",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(bodyData),
//   });
//   if (res.status !== 200) return alert("something went wrong");
//   if (res.status === 200) {
//     const json = await res.json();
//     if (json.success) {
//       setToDelete([]);
//     }
//   }

// const bodyData = formatData(toConfirm);
// const res = await fetch("./api/agencies/dashboard", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify(bodyData),
// });
// if (res.status !== 201) return alert("something went wrong for posting");
// const json = await res.json();
// setToConfirm([]);
