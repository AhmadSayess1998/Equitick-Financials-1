// import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import Swal from "sweetalert2";

export const useLogin = () => {
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    const response = await fetch("http://localhost:2000/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      Swal.fire({
        title: " check you email and password",
        icon: "error",
        timer: 2000,
        timerProgressBar: true,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
      });
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });

      Swal.fire({
        title: " Log In Successfully",
        icon: "success",
        timer: 2000,
        timerProgressBar: true,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
      });
    }
  };

  return { login };
};
