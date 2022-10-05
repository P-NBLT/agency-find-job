import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Input } from "../../atoms";
import { useForm } from "react-hook-form";
import styles from "./AgencyForm.module.css";

const AgencyForm = ({
  onSubmit,
  register,
  errors,
  feedback,
  buttonLabel,
  ...props
}) => {
  return (
    <div className={styles.containerMaster}>
      <form className={styles.container} onSubmit={onSubmit} id="postput">
        <div className={styles.formContainer}>
          <Input
            type="text"
            register={{
              ...register("name", { required: "This is field is required" }),
            }}
            label="Company name"
          />
          {errors.name?.message}
          <Input
            type="text"
            register={{
              ...register("city", {
                required: "This is field is required",
              }),
            }}
            label="City"
          />
          {errors.city?.message}
          <Input
            type="text"
            register={{
              ...register("region", { required: "This is field is required" }),
            }}
            label="Region"
          />
          {errors.region?.message}
          <Input
            type="text"
            register={{
              ...register("size", { required: "This is field is required" }),
            }}
            label="Company size"
          />
          {errors.size?.message}
          <Input
            type="text"
            register={{
              ...register("website", { required: "This is field is required" }),
            }}
            label="Website"
          />
          {errors.website?.message}
          <Input
            type="text"
            register={{
              ...register("logo", { required: "This is field is required" }),
            }}
            label="Logo of the company"
          />
          {errors.logo?.message}
        </div>
        <div className={styles.buttonContainer}>
          <Button
            variant="tertiary"
            size="small"
            type="submit"
            form="postput"
            id="post"
          >
            {buttonLabel}
          </Button>
        </div>
      </form>
      <div>{feedback && <pre>{feedback}</pre>}</div>
    </div>
  );
};

AgencyForm.propTypes = {};

export default AgencyForm;
