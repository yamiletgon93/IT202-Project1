/* Fictional accounts for the assignment, not real credentials. */
var movingRepresentatives = [
  { firstName: "Barry", lastName: "Box", password: "!Move1A", id: "1001", phone: "201-555-0101 ext. 101", email: "barry.box@example.com" },
  { firstName: "Maya", lastName: "Reed", password: "@Move2B", id: "1002", phone: "201-555-0102 ext. 102", email: "maya.reed@example.com" },
  { firstName: "Leo", lastName: "Cruz", password: "#Move3C", id: "1003", phone: "201-555-0103 ext. 103", email: "leo.cruz@example.com" },
  { firstName: "Nina", lastName: "Park", password: "$Move4D", id: "1004", phone: "201-555-0104 ext. 104", email: "nina.park@example.com" },
  { firstName: "Owen", lastName: "Hill", password: "%Move5E", id: "1005", phone: "201-555-0105 ext. 105", email: "owen.hill@example.com" },
  { firstName: "Ava", lastName: "Stone", password: "&Move6F", id: "1006", phone: "201-555-0106 ext. 106", email: "ava.stone@example.com" },
  { firstName: "Eli", lastName: "Brooks", password: "*Move7G", id: "1007", phone: "201-555-0107 ext. 107", email: "eli.brooks@example.com" },
  { firstName: "Zoe", lastName: "Lane", password: "+Move8H", id: "1008", phone: "201-555-0108 ext. 108", email: "zoe.lane@example.com" },
  { firstName: "Noah", lastName: "Wells", password: "?Move9J", id: "1009", phone: "201-555-0109 ext. 109", email: "noah.wells@example.com" },
  { firstName: "Isla", lastName: "Hart", password: "!Pack0K", id: "1010", phone: "201-555-0110 ext. 110", email: "isla.hart@example.com" }
];

var form = document.getElementById("representative-form");
var confirmation = document.getElementById("email-confirmation");
var passwordInput = document.getElementById("password");
var passwordToggle = document.getElementById("password-toggle");
var invalidField = null;

/* All format validation uses regular expressions in this separate JS file. */
var namePattern = /^\p{L}+(?:[ '\u2019-]\p{L}+)*$/u;
var passwordPattern = /^(?=[^A-Za-z0-9\s])(?=.*[A-Z])(?=.*\d)[\x21-\x7E]{3,7}$/;
var idPattern = /^\d{4}$/;
var phonePattern = /^(\d{3}[ -]?\d{3}[ -]?\d{4})\s*(?:ext\.?|x)\s*(\d{1,6})$/i;
var emailPattern = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)*\.[A-Za-z]{2,5}$/;

var validationRules = [
  { id: "first-name", pattern: namePattern, message: "Enter your first name using letters. Spaces, apostrophes, and hyphens may separate parts of a name; numbers and other symbols are not allowed." },
  { id: "last-name", pattern: namePattern, message: "Enter your last name using letters. Spaces, apostrophes, and hyphens may separate parts of a name; numbers and other symbols are not allowed." },
  { id: "password", pattern: passwordPattern, message: "Enter a password of at most 7 characters. Start with a special character and include at least one uppercase letter and one number. Use printable characters with no spaces." },
  { id: "representative-id", pattern: idPattern, message: "Enter exactly 4 digits for your representative ID, for example 1001." },
  { id: "phone", pattern: phonePattern, message: "Enter a 10-digit phone number and an extension, for example 201-555-0101 ext. 101. Spaces or dashes may separate the phone digits. Use ext, ext., or x followed by 1 to 6 extension digits." },
  { id: "email", pattern: emailPattern, message: "Email confirmation is checked. Enter an email such as barry.box@example.com, with @, a dot after @, and a final domain ending of 2 to 5 letters." }
];

function valueFor(field) {
  // Passwords are compared exactly; other text may have surrounding spaces.
  return field.id === "password" ? field.value : field.value.trim();
}

function ruleFor(field) {
  return validationRules.find(function (rule) { return rule.id === field.id; });
}

function fieldIsValid(field) {
  if (field.id === "email" && !confirmation.checked) { return true; }
  return ruleFor(field).pattern.test(valueFor(field));
}

function clearError() {
  if (invalidField) { invalidField.removeAttribute("aria-invalid"); }
  invalidField = null;
}

function focusError(field) {
  field.focus();
}

/* Validate one field at a time, then call verify only when all fields pass. */
function validate(htmlForm) {
  if (invalidField && !fieldIsValid(invalidField)) {
    focusError(invalidField);
    return false; // Do not issue a new alert before the previous issue is fixed.
  }
  clearError();

  for (var i = 0; i < validationRules.length; i++) {
    var rule = validationRules[i];
    var field = document.getElementById(rule.id);
    if (!fieldIsValid(field)) {
      invalidField = field;
      field.setAttribute("aria-invalid", "true");
      alert(rule.message);
      focusError(field);
      return false;
    }
  }
  return verify(htmlForm);
}

function normalizedPhone(value) {
  var match = value.trim().match(phonePattern);
  return match ? match[1].replace(/[ -]/g, "") + "x" + match[2] : "";
}

/* Every supplied credential must match the SAME representative object. */
function verify(htmlForm) {
  var firstName = document.getElementById("first-name").value.trim();
  var lastName = document.getElementById("last-name").value.trim();
  var password = passwordInput.value;
  var id = document.getElementById("representative-id").value.trim();
  var phone = normalizedPhone(document.getElementById("phone").value);
  var email = document.getElementById("email").value.trim();

  var representative = movingRepresentatives.find(function (account) {
    return account.firstName === firstName && account.lastName === lastName &&
      account.password === password && account.id === id &&
      normalizedPhone(account.phone) === phone &&
      (!confirmation.checked || account.email === email);
  });

  if (!representative) {
    alert("An account for moving representative " + firstName + " " + lastName + " cannot be found. Check that all details match your account.");
    return false;
  }

  var transaction = htmlForm.elements.transaction;
  alert("Welcome, " + firstName + " " + lastName + "! You have entered the Moving On Up system. Transaction selected: " + transaction.options[transaction.selectedIndex].text + ".");
  return true;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  validate(form);
});

// Keep focus on an invalid field without raising more alerts.
form.addEventListener("focusin", function (event) {
  if (!invalidField) { return; }
  if (fieldIsValid(invalidField)) { clearError(); return; }
  if (event.target === invalidField || event.target.id === "reset-button" ||
      event.target === passwordToggle || event.target === confirmation) { return; }
  focusError(invalidField);
});

form.addEventListener("input", function () {
  if (invalidField && fieldIsValid(invalidField)) { clearError(); }
});

confirmation.addEventListener("change", function () {
  document.getElementById("email-note").textContent = confirmation.checked ? "REQUIRED" : "IF REQUESTED";
  if (invalidField && fieldIsValid(invalidField)) { clearError(); }
});

passwordToggle.addEventListener("click", function () {
  var show = passwordInput.type === "password";
  passwordInput.type = show ? "text" : "password";
  passwordToggle.setAttribute("aria-label", show ? "Hide password" : "Show password");
  passwordToggle.setAttribute("aria-pressed", String(show));
  passwordInput.focus();
});

form.addEventListener("reset", function () {
  clearError();
  passwordInput.type = "password";
  passwordToggle.setAttribute("aria-label", "Show password");
  passwordToggle.setAttribute("aria-pressed", "false");
  document.getElementById("email-note").textContent = "IF REQUESTED";
});
