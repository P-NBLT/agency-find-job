import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AgencyForm } from "../../component/organism";
import { Header } from "../../component/molecules";
import styles from "../../styles/Form.module.css";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Loading from "../../component/organism/Loading/Loading";

const Form = (props) => {
  const [apiResponse, setApiResponse] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ reValidateMode: "onSubmit" });

  useEffect(() => {
    async function checkifLogedin() {
      const res = await fetch("/api/auth/authenticate", {
        method: "GET",
      });
      if (res.status == 500) return router.push("/");
      const json = await res.json();
      console.log(json);
      if (!json.success) return router.push("/check-in");
    }
    checkifLogedin();
  });

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
    if (json.message) {
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
            feedback={apiResponse}
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
