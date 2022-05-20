import { callAPI } from "./API";
import { history } from "../App";
import User from "../models/User";

export const authentificate = async (data) => {
  const onLogin = window.location.href.includes("login")

  callAPI("POST", onLogin ? "users/login" : "users/register", data)
    .then((res) => {
      if (res.success) {
        // showSuccess(onLogin ? "Login success!" : "Register success!");
        const token = res.data.user.token.token;
        const expiration = res.data.user.token.expiration;
        localStorage.setItem("user", JSON.stringify(User(res.data.user)));
        document.cookie = `authToken=${token};max-age=${expiration};path=/`;
        history.push("/products");
      } else {
        // showError(onLogin ? "Login Failed!" : "Register Failed!");
      }
    })
    .catch(function (error) {
      // showError("Error");
    });
}