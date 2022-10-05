import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AgencyForm, Loading } from "../../../component/organism";
import { Header } from "../../../component/molecules";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import styles from "../../../styles/Form.module.css";
import { PrismaClient } from "@prisma/client";
import Loading from "../../../component/organism";

export async function getServerSideProps(context) {
  const id = Number(context.query.id);
  const prisma = new PrismaClient();
  const agency = await prisma.agency.findUnique({
    where: {
      id: id,
    },
  });

  return {
    props: {
      agency,
    },
  };
}

function Edit({ agency }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    reValidateMode: "onSubmit",
    defaultValues: {
      name: agency.name,
      city: agency.city,
      region: agency.region,
      size: agency.size,
      website: agency.website,
      logo: agency.logo,
    },
  });

  useEffect(() => {
    async function checkIfLogedin() {
      const res = await fetch("/api/auth/authenticate", { method: "GET" });
      if (res.status == 500) return alert("Something went wrong");
      const json = await res.json();
      console.log("myJson", json);
      if (!json.success) router.push("/check-in");
    }
    checkIfLogedin();
  }, []);

  // console.log(agency);
  const onSubmit = handleSubmit(async (data, e) => {
    console.log(data);
    setIsLoading(true);
    const res = await fetch(`../../api/agencies/${router.query.id}/edit`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    console.log(res);

    if (!res.ok) {
      alert(
        "Bad Request! Make sure to fill the reference if you want to update the exisiting data"
      );
    }
    const json = await res.json();
    console.log(json);
    if (json.message) router.push("/login");
    router.push("/agencies/success");
  });

  return (
    <>
      {!isLoading ? (
        <div className={styles.body}>
          <Header />
          <AgencyForm
            onSubmit={onSubmit}
            register={register}
            errors={errors}
            // feedback={apiResponse}
            buttonLabel={"Update Agency"}
          />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

Edit.propTypes = {};

export default Edit;
