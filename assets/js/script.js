var hamburger = document.querySelector('.hamburger'),
  header = document.querySelector('.header-content'),
  navList = document.querySelectorAll('.nav-list'),
  categoryList = document.querySelectorAll('.category-list a'),
  productList = document.querySelectorAll('.product-list'),
  loginForm = document.querySelector('form[name=login-form'),
  logoutBtn = document.querySelector('.logout-btn'),
  priceForm = document.querySelector('.price-form');

// hamburger function
if (hamburger) {
  var hamburger = document.querySelector('.hamburger');
  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active-hamburger');
    document.documentElement.classList.toggle('remove-scroll');
  });
}

// local storage function start
function checkStorage() {
  var storage = localStorage.getItem('user');
  if (storage && !header) {
    location.href = 'home.html';
  } else if (!storage && !loginForm) {
    location.href = 'login.html';
  }
}
// local storage create function
function createStorage(username, password) {
  localStorage.setItem('user', [username, password]);
}
// local storage clear function 
function clearStorage() {
  localStorage.clear();
  location.href = 'login.html'
}
// local storage function end

// login function start
function validateInput(form) {
  var usernameDiv = form.children[1],
    passDiv = form.children[2], valid;
  userValid = validateError(usernameDiv, "saif", "*Invalid username");
  passValid = validateError(passDiv, "1234", "*Invalid password");
  if (userValid && passValid) {
    valid = true;
  } else {
    valid = false;
  }
  return valid;
}
// error function
function validateError(inputDiv,valid,message) {
  var valid;
  if (inputDiv.children[2]) {
    inputDiv.children[2].remove();
  }
  if (inputDiv.children[1].value == valid) {
    valid = true;
  } else {
    valid = false;
    var span = document.createElement("span");
    span.classList.add("input-error");
    span.innerText = message;
    inputDiv.appendChild(span);
  }
  return valid;
}

if (loginForm) {
  loginForm.addEventListener('submit',function (e) {
    e.preventDefault();
    var valid = validateInput(this),
    username = loginForm.children[1].children[1].value,
    password = loginForm.children[2].children[1].value;
    if (valid) {
      createStorage(username,password);
      location.href = 'home.html';
    }
  })
}
// login function end

// onload login check
document.onload = checkStorage();

// logout function
if (logoutBtn) {
  logoutBtn.addEventListener('click',clearStorage);
}





















