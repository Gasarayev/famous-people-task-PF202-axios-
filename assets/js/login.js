import { credentials } from "./credential.js";
const form = document.querySelector(".login-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.querySelector("#usermail").value;
  const password = document.querySelector("#password").value;

  function loginPassword() {
    if (email === credentials.email && password === credentials.password) {
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "index.html";
    } else {
      alert("Email və ya şifrə yanlışdır!");
    }
  }

  if (
    email.includes("@") &&
    !/\d/.test(email[0]) &&
    !email.includes("<") &&
    !email.includes(">") &&
    !password.includes("<") &&
    !password.includes(">")
  ) {
    loginPassword();
  } else {
    alert(
      "Email daxil etmə qaydası pozulub! < və > işarələrindən istifadə edə bilməzsiniz."
    );
  }
});
