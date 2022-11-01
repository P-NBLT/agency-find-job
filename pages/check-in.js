import React, { useState } from "react";
import styles from "./../styles/checkIn.module.css";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Button, Input } from "../component/atoms";
import { Header } from "./../component/molecules/";
import { loginSchema, signupSchema } from "../validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLogin } from "../Context/LoginProvider/LoginProvider";
import { useTheme } from "../Context/ThemeProvider/ThemeProvider";

const CheckIn = (props) => {
  const [resLoginError, setResLoginError] = useState({ message: "" });
  const [resSignupError, setResSignupError] = useState({ message: "" });
  const handleLoginStatus = useLogin().login;
  const darkTheme = useTheme();

  const BACKGROUD_STYLE = {
    backgroundColor: darkTheme ? "var(--midnight)" : "#f2f2f2",
    color: "var(--dark-blue)",
  };

  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    reValidateMode: "onSubmit",
    resolver: yupResolver(loginSchema),
  });
  const {
    register: regiserSignup,
    handleSubmit: handleSubmitSignup,
    reset: resetSignup,
    formState: { errors: errorsSignup },
  } = useForm({
    reValidateMode: "onSubmit",
    resolver: yupResolver(signupSchema),
  });

  const onSubmitLogin = handleSubmit(async (data) => {
    console.log("data siggnup ", data, data.eamil);
    data.email = data.email.toLowerCase();
    const res = await fetch("api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (res.status == 500) return alert("something went wrong");

    const json = await res.json();
    console.log(json);

    if (json.message)
      setResLoginError((prev) => {
        return { ...prev, message: json.message };
      });
    if (json.success) {
      handleLoginStatus();
      router.push("/");
    }
  });

  const onSubmitSingup = handleSubmitSignup(async (data) => {
    console.log("data siggnup ", data, data.email);
    data.email = data.email.toLowerCase();
    const res = await fetch("api/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (json.message == "This email already exist")
      setResSignupError((prev) => {
        return { ...prev, email: json.message };
      });
    resetSignup();
  });

  return (
    <>
      <div className={styles.checkinContainerMaster} style={BACKGROUD_STYLE}>
        <Header />
        <div className={styles.checkinContainer}>
          <div
            className={`${styles.loginContainer} ${styles.defaultFormContainer}`}
          >
            <form
              onSubmit={onSubmitLogin}
              className={`${styles.loginForm} ${styles.defaultForm}`}
              id="login"
            >
              <Input
                type="text"
                register={{
                  ...register("email", {
                    required: "This is field is required",
                  }),
                }}
                label="email"
              />
              {errors.email?.message}

              <Input
                type="password"
                register={{
                  ...register("password", {
                    required: "This is field is required",
                  }),
                }}
                label="password"
              />
              {errors.password?.message}
              {resLoginError.message && <p>{resLoginError.message}</p>}

              <Button
                type="submit"
                variant="tertiary"
                form="login"
                padding="pd-small"
              >
                Login
              </Button>
            </form>
          </div>
          {/* Signup form */}
          <div
            className={`${styles.signupContainer} ${styles.defaultFormContainer}`}
          >
            <form
              onSubmit={onSubmitSingup}
              className={`${styles.singupForm} ${styles.defaultForm}`}
              id="signup"
            >
              <Input
                type="text"
                register={{
                  ...regiserSignup("firstName", {
                    required: "This field is required",
                  }),
                }}
                label={"First Name"}
              />
              {errorsSignup.firstName?.message}
              <Input
                type="text"
                register={{
                  ...regiserSignup("lastName", {
                    required: "This field is required",
                  }),
                }}
                label={"Last Name"}
              />
              {errorsSignup.lastName?.message}
              <Input
                type="text"
                register={{
                  ...regiserSignup("email", {
                    required: "This field is required",
                  }),
                }}
                label={"email"}
              />
              {errorsSignup.email?.message}
              {resSignupError?.message}
              <Input
                type="password"
                register={{
                  ...regiserSignup("password", {
                    required: "This field is required",
                  }),
                }}
                label={"password"}
              />
              {errorsSignup.password?.message}
              <Input
                type="password"
                register={{
                  ...regiserSignup("passwordConfirmation", {
                    required: "This field is required",
                  }),
                }}
                label={"Comfirm Password"}
              />
              {errorsSignup.passwordConfirmation?.message}
              <Button
                type="submit"
                variant="tertiary"
                form="signup"
                padding="pd-small"
              >
                Singup
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

CheckIn.propTypes = {};

export default CheckIn;
