import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Input } from "../../atoms";
import { useForm } from "react-hook-form";
import styles from "./AgencyForm.module.css";

const AgencyForm = (props) => {
  const [apiResponse, setApiResponse] = useState();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ reValidateMode: "onSubmit" });
  const {
    register: register1,
    handleSubmit: handleSubmit1,
    reset: reset1,
    formState: { errors: errors1 },
  } = useForm({ reValidateMode: "onSubmit" });

  function submitRequest(e) {
    // e.preventDefault();
    console.log(e);
  }

  function deleteAgency() {
    console.log(data);
  }

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

          if (!res.ok) {
            alert(
              "Bad Request! Make sure to fill the reference if you want to update the exisiting data"
            );
          }
          const json = await res.json();
          console.log("json", json);
          reset();
          setApiResponse(JSON.stringify(json, null, 4));
        })}
        id="postput"
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
          <p>
            If you want to change an existing agency you need to complete the
            input below.
          </p>
          <Input
            type="text"
            register={{
              ...register("oldName"),
            }}
            label="Company you wish to update information"
          />
          <Input
            type="text"
            register={{
              ...register("oldCity"),
            }}
            label="City of the company you wish to update information"
          />
        </div>
        <div className={styles.buttonContainer}>
          <Button
            variant="tertiary"
            size="small"
            type="submit"
            form="postput"
            id="post"
            onClick={handleSubmit}
          >
            POST
          </Button>
          <Button
            variant="tertiary"
            size="small"
            type="submit"
            form="postput"
            id="put"
          >
            PUT
          </Button>
        </div>
      </form>
      {/* second form /////////////////////// */}
      <form
        className={styles.containerTwo}
        onSubmit={handleSubmit1(async (data) => {
          console.log(data);
          const res = await fetch("api/agencies/agencies", {
            method: "DELETE",
            body: JSON.stringify(data),
          });
          if (!res.ok) {
            alert("the agency you want to delete seems to not exist.");
          }
          const json = await res.json();
          reset1();
          setApiResponse(JSON.stringify(json));
        })}
        id="deleteForm"
      >
        <div className={styles.formContainer}>
          <Input
            type="text"
            register={{
              ...register1("name", { required: "This feeld is required" }),
            }}
            label="Company you wish to delete information"
          />
          {errors1.name?.message}
          <Input
            type="text"
            register={{
              ...register1("city", { required: "This feeld is required" }),
            }}
            label="City of the company you wish to delete information"
          />
          {errors1.city?.message}
        </div>
        <div className={styles.buttonContainer}>
          <Button
            variant="tertiary"
            size="small"
            type="submit"
            form="deleteForm"
            id="delete"
          >
            DELETE
          </Button>
        </div>
      </form>
      <div>{apiResponse && <pre>{apiResponse}</pre>}</div>
    </div>
  );
};

AgencyForm.propTypes = {};

export default AgencyForm;
