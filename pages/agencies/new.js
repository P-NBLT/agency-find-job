import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AgencyForm } from "../../component/organism";
import { Header } from "../../component/molecules";
import styles from "../../styles/Form.module.css";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Loading from "../../component/organism/Loading/Loading";
import { isRedirect } from "../../util/functionHelper";

export async function getServerSideProps({ req, res }) {
  const { headers } = req;
  const redirect = await isRedirect(headers);
  if (redirect) {
    return {
      redirect: {
        destination: "/check-in",
        permanent: false,
      },
    };
  }
  return {
    props: {
      null: null,
    },
  };
}

const Form = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ reValidateMode: "onSubmit" });

  const onSubmit = handleSubmit(async (data, e) => {
    console.log(data);
    setIsLoading(true);
    const res = await fetch("../api/agencies", {
      method: "POST",
      body: JSON.stringify(data),
    });
    console.log(res);

    if (!res.ok) {
      alert(
        "Bad Request! Make sure to fill the reference if you want to update the exisiting data"
      );
    }
    const json = await res.json();
    if (json.message !== "sucess sent to agency db") {
      router.push("/check-in");
    }
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
            buttonLabel="Add Agency"
          />
        </div>
      ) : (
        <div className={styles.body}>
          <Header />
          <Loading />
        </div>
      )}
    </>
  );
};

Form.propTypes = {};

export default Form;
