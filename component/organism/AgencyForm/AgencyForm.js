import React from "react";
import PropTypes from "prop-types";
import { Button, Input } from "../../atoms";
import { useForm } from "react-hook-form";
import styles from "./AgencyForm.module.css";

const AgencyForm = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ reValidateMode: "onSubmit" });

  function submitRequest(e) {
    // e.preventDefault();
    console.log(e);
  }
  console.log(errors);

  return (
    <div className={styles.containerMaster}>
      <form
        className={styles.container}
        onSubmit={handleSubmit(async (data, e) => {
          const reqType = e.nativeEvent.submitter.innerHTML;
          console.log("data", data);
          const res = await fetch("api/agencies/agencies", {
            method: reqType,
            body: JSON.stringify(data),
          });
          const json = await res;
          console.log("json", json);
        })}
        id="crud"
      >
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
            form="crud"
            id="post"
            onClick={handleSubmit}
          >
            POST
          </Button>
          <Button
            variant="tertiary"
            size="small"
            type="submit"
            form="crud"
            id="put"
          >
            PUT
          </Button>
          <Button
            variant="tertiary"
            size="small"
            type="submit"
            form="crud"
            id="patch"
          >
            PATCH
          </Button>
          <Button
            variant="tertiary"
            size="small"
            type="submit"
            form="crud"
            id="delete"
          >
            DELETE
          </Button>
        </div>
      </form>
    </div>
  );
};

AgencyForm.propTypes = {};

export default AgencyForm;
