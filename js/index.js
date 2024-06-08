var regNameInput = document.getElementById("regName");
var regEmailInput = document.getElementById("regEmail");
var regPasswordInput = document.getElementById("regPassword");

var registerList = [];

if (localStorage.getItem("accountKey") != null) {
  registerList = JSON.parse(localStorage.getItem("accountKey"));
}

function addNewAccount() {
  var signinBtn = document.getElementById("signinBtn");
  if (
    registerValidation(regNameInput, regNameMeg) &&
    registerValidation(regEmailInput, regEmailMsg) &&
    registerValidation(regPasswordInput, regPasswordMsg) &&
    reEmailValidation()
  ) {
    accountObject = {
      name: regNameInput.value,
      email: regEmailInput.value,
      password: regPasswordInput.value,
    };

    registerList.push(accountObject);

    localStorage.setItem("accountKey", JSON.stringify(registerList));
    signinBtn.setAttribute("href", "../index.html");
    clearRegisterInputs();
  }
}

function clearRegisterInputs() {
  regEmailInput.value = null;
  regNameInput.value = null;
  regPasswordInput.value = null;
  regEmailInput.classList.remove("is-valid");
  regNameInput.classList.remove("is-valid");
  regPasswordInput.classList.remove("is-valid");
}

function registerValidation(element, errorEleID) {
  errorMsg = document.getElementById(errorEleID.id);
  var regex = {
    regName: /^[a-z ]+$/i,
    regEmail: /^[A-z0-9\_%+\-]+@[A-z0-9\.\-]+\.[A-z]{2,}$/,
    regPassword:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  };
  var text = element.value;
  if (regex[element.id].test(text)) {
    element.classList.remove("is-invalid");
    errorMsg.classList.remove("d-block");
    return true;
  } else {
    element.classList?.add("is-invalid");
    errorMsg.classList.add("d-block");
    return false;
  }
}

function reEmailValidation() {
  if (registerList.length == 0) {
    return true;
  }
  for (var i = 0; i < registerList.length; i++) {
    if (regEmailInput.value == registerList[i].email) {
      regEmailInput.classList.add("is-invalid");
      regEmailInput.classList.remove("is-valid");
      regEmailMsg.innerHTML = "this Email already exist";
      return false;
    }
    regEmailMsg.innerHTML = "invalid email";
    return true;
  }
}

// login page logic
var mainIndex = 0;
var loginEmail = document.getElementById("loginEmail");
var loginPassword = document.getElementById("loginPassword");
var logEmailMsg = document.getElementById("logEmailMsg");
var logPassMsg = document.getElementById("logPasswordMsg");
var sessionUser;

function loginToHome() {
  var loginBtn = document.getElementById("loginBtn");
  if (
    loginValidation(loginEmail, logEmailMsg) &&
    loginValidation(loginPassword, logPassMsg) &&
    confirmEmail()
  ) {
    loginBtn.setAttribute("href", "../pages/home.html");
  }
}
function clearLogin() {
  loginEmail.value = null;
  loginPassword.value = null;
}
function confirmEmail() {
  for (var i = 0; i < registerList.length; i++) {
    if (loginEmailCheck(i) && loginPasswordCheck(i)) {
      sessionStorage.setItem("userLogin", registerList[i].name);
      return true;
    }
  }
  return false;
}
function loginEmailCheck(index) {
  if (loginEmail.value === registerList[index].email) {
    loginEmail.classList.remove("is-invalid");
    logEmailMsg.classList.remove("d-block");
    return true;
  } else {
    loginEmail.classList.add("is-invalid");
    logEmailMsg.classList.add("d-block");
    return false;
  }
}
function loginPasswordCheck(index) {
  if (registerList[index].password === loginPassword.value) {
    loginPassword.classList.remove("is-invalid");
    logPassMsg.classList.remove("d-block");
    return true;
  } else {
    loginPassword.classList.add("is-invalid");
    logPassMsg.classList.add("d-block");
    return false;
  }
}
function loginValidation(element, errorEleID) {
  errorMsg = document.getElementById(errorEleID.id);
  var regex = {
    loginEmail: /^[A-z0-9\_%+\-]+@[A-z0-9\.\-]+\.[A-z]{2,}$/,
    loginPassword:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  };
  var text = element.value;
  if (regex[element.id].test(text)) {
    element.classList.remove("is-invalid");
    errorMsg.classList.remove("d-block");
    return true;
  } else {
    element.classList.add("is-invalid");
    errorMsg.classList.add("d-block");
    return false;
  }
}
// home page name
userNameHeader.innerHTML = sessionStorage.getItem("userLogin");