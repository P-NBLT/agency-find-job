import React, { useState } from "react";
import PropTypes from "prop-types";
import { AgencyForm } from "../../component/organism";
import { Header } from "../../component/molecules";
import styles from "../../styles/Form.module.css";
import { useForm } from "react-hook-form";

const form = (props) => {
  const [apiResponse, setApiResponse] = useState();
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
    console.log("json", json);
    reset();
    setApiResponse(JSON.stringify(json, null, 4));
  });

  return (
    <>
      <div className={styles.body}>
        <Header />
        <AgencyForm
          onSubmit={onSubmit}
          register={register}
          errors={errors}
          feedback={apiResponse}
        />
      </div>
    </>
  );
};

form.propTypes = {};

export default form;
