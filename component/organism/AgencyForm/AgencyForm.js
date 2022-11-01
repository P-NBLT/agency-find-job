import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Input } from "../../atoms";
import { useForm } from "react-hook-form";
import styles from "./AgencyForm.module.css";

const AgencyForm = ({ onSubmit, register, errors, buttonLabel, ...props }) => {
  console.log(errors);
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
          <label htmlFor="size">Company Size</label>
          <select
            style={{ height: "30px", borderRadius: "8px" }}
            {...register("size", {
              required: "This is field is required",
              pattern: /1-10|11-50|51-100|GT-100/,
            })}
            label="Company size"
            id="size"
          >
            <option value="null">Select one of the option</option>
            <option value="1-10">1-10</option>
            <option value="11-50">11-50</option>
            <option value="51-100">51-100</option>
            <option value="GT-100">GT-100</option>
          </select>
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
    </div>
  );
};

AgencyForm.propTypes = {};

export default AgencyForm;
