import React, { useState } from "react";
import PropTypes from "prop-types";
import { AgencyForm } from "../../component/organism";
import { Header } from "../../component/molecules";
import styles from "../../styles/Form.module.css";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

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

  const onSubmit = handleSubmit(async (data, e) => {
    console.log(data);
    // const reqType = e.nativeEvent.submitter.innerHTML;
    // console.log("data", data);
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
        <p>Loading...</p>
      )}
    </>
  );
};

form.propTypes = {};

export default Form;
