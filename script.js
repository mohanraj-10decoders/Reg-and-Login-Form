let form = document.getElementById('form');
let signIn = document.getElementById('sign-in');
let signInForm = document.getElementById('signin-form');
let signInError = document.getElementById('signinError');
let username = document.getElementById('username');
let regHere = document.getElementById('here');
let dob = document.getElementById('dob');
let email = document.getElementById('email');
let errorMsg = document.getElementById('error');
let today = new Date();
let inputDate = dob.value.split('-');
let birthday = new Date(inputDate[0], +inputDate[1] - 1, inputDate[2]);

form.addEventListener('submit', (e) => {
  // e.preventDefault();
  function _calculateAge(birthday) {
    // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  let age = _calculateAge(birthday);
  if (age < 2) {
    errorMsg.innerText = 'You must be atleast 2 years old';
    console.log('Age less than 2');
  } else {
    console.log('Age more than or equal to 18');
  }
  let users = localStorage.getItem('users');
  if (!users) {
    let usersData = [email.value];
    localStorage.setItem('users', usersData.toString());
  } else {
    let usersData = users.split(',');
    if (usersData.includes(email.value)) {
      e.preventDefault();
      errorMsg.innerText = 'User with the email exists';
    } else {
      usersData.push(email.value);
      localStorage.setItem('users', usersData.toString());
    }
  }
});

signIn.addEventListener('click', (e) => {
  form.style.display = 'none';
  signInForm.style.display = 'block';
  console.log('clicked');
});

regHere.addEventListener('click', (e) => {
  form.style.display = 'block';
  signInForm.style.display = 'none';
});

signInForm.addEventListener('submit', (e) => {
  // e.preventDefault();
  let users = localStorage.getItem('users').split(',');
  console.log('sign users', users);
  if (!users.includes(username.value)) {
    e.preventDefault();
    signInError.innerText = 'User not registered';
  }
});
