import { useEffect, useState } from "react";
import { Button } from "../../component/atoms";
import { useRouter } from "next/router";
import { Card } from "../../component/molecules";
import stylesCard from "../../component/molecules/Card/Card.module.css";
import styles from "../../styles/success.module.css";
function Success() {
  const [newAgency, setNewAgency] = useState();
  const router = useRouter();

  useEffect(() => {
    async function getNewCard() {
      const res = await fetch("../api/agencies/read", {
        method: "GET",
      });
      if (!res.ok) {
        alert("something went wrong");
      }
      const resAgency = await res.json();
      setNewAgency(resAgency);
    }
    getNewCard();
  }, []);
  // console.log(newAgency.website);

  return (
    <div className={styles.successContainerMaster}>
      <div className={styles.successContainer}>
        <h3>Succesful request! Here is the new Card</h3>

        <div className={`${stylesCard.cardContainer}`}>
          {newAgency && (
            <Card
              isValid="notvisible"
              href={newAgency.website}
              img={newAgency.logo}
              labelName={newAgency.name}
              labelRegion={newAgency.region}
              labelCity={newAgency.city}
              labelSize={newAgency.size}
              labelWebsite={newAgency.website}
              id={newAgency.id}
            />
          )}
        </div>

        <div className={styles.redirectButton}>
          <Button
            onClick={() => router.push("/agencies/new")}
            padding="pd-small"
            variant="primary"
          >
            Add a new agency
          </Button>
          <Button
            onClick={() => router.push("/")}
            variant="primary"
            padding="pd-small"
          >
            Go back to the search page
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Success;
