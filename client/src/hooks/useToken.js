import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    if (tokenString === "undefined") return null;
    const userToken = JSON.parse(tokenString);
    return userToken;
  };
  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken);
  };

  const removeToken = () => {
    localStorage.removeItem("token");
    setToken();
  };

  const [profilePic, setProfilePic] = useState("");
  const [email, setEmail] = useState("");

  const saveProfilePic = (url) => {
    localStorage.setItem("profilePic", url);
    setProfilePic(url);
  };
  const saveEmail = (email) => {
    localStorage.setItem("email", email);
    setEmail(email);
  };

  return {
    token,
    setToken: saveToken,
    removeToken,
    saveProfilePic,
    profilePic,
    email,
    saveEmail,
  };
}
