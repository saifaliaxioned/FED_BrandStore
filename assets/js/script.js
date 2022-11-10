var hamburger = document.querySelector('.hamburger'),
  header = document.querySelector('.header-content'),
  navList = document.querySelectorAll('.nav-list'),
  categoryList = document.querySelectorAll('.category-list a'),
  productList = document.querySelectorAll('.product-list'),
  loginForm = document.querySelector('.login-form'),
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
function validateError(inputDiv, valid, message) {
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
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var valid = validateInput(this),
      username = loginForm.children[1].children[1].value,
      password = loginForm.children[2].children[1].value;
    if (valid) {
      createStorage(username, password);
      location.href = 'home.html';
    }
  })
}
// login function end

// onload login check
document.onload = checkStorage();

// logout function
if (logoutBtn) {
  logoutBtn.addEventListener('click', clearStorage);
}

// category page function start
// filter function
function sortProduct(li, products) {
  var key = document.URL.split('?');
  li.forEach(function (contentList) {
    if (contentList.dataset.list == key[1]) {
      contentList.classList.add('active-list');
    }
  })
  products.forEach(function (product) {
    var productCategory = product.dataset.category;
    if (key[1] === 'everything') {
      product.classList.remove('hide-content');
    } else if (key[1] !== productCategory) {
      product.classList.add('hide-content');
    } else {
      product.classList.remove('hide-content');
    }
  })
}

if (priceForm) {
  sortProduct(navList, productList);
  sortProduct(categoryList, productList);
}
// category page function end

// modal function
if (header) {
  var productFigure = document.querySelectorAll('.product-image'),
    productImage = document.querySelectorAll('.product-image img');
  // Image function
  productImage.forEach(function (image, i) {
    var imageSource = image.src;
    image.index = i;
    image.addEventListener('click', function () {
      imageModal = document.createElement('div'),
        imageModal.classList.add('modalDiv');
      imageModal.innerHTML = `<div class="modal-content">
      <div class="cancel-btn">
          <span>cancel</span>
        </div>
        <figure class="modal-img">
          <img src="${imageSource}" alt="Modal Image">
        </figure>
        <div class="slide-controls">
          <div class="prevBtn">
            <span>prev</span>
          </div>
          <div class="nextBtn">
            <span>next</span>
          </div>
        </div>
      </div>`;
      document.body.appendChild(imageModal);

      var modal = document.querySelector('.modalDiv'),
        modalImage = document.querySelector('.modalDiv img'),
        prevBtn = document.querySelector('.prevBtn span'),
        nextBtn = document.querySelector('.nextBtn span'),
        currentIndex;
      currentIndex = image.index;
      // Modal function
      if (modal) {
        modal.addEventListener('click', function (e) {
          if (e.target === modal || e.target === modal.children[0].children[0].children[0]) {
            modal.remove();
            document.documentElement.classList.remove('remove-scroll');
          };
        });
        // slider function
        nextBtn.addEventListener('click', function () {
          currentIndex++;
          if (currentIndex > productFigure.length - 1) {
            currentIndex = 0;
          }
          slider();
        });
        prevBtn.addEventListener('click', function () {
          currentIndex--;
          if (currentIndex < 0) {
            currentIndex = productFigure.length - 1;
          }
          slider();
        });
        function slider() {
          modalImage.src = productImage[currentIndex].src;
        }
        // Escape key function
        document.addEventListener('keydown', function (e) {
          if (e.key === "Escape") {
            modal.remove();
            document.documentElement.classList.remove('remove-scroll');
          };
        });
      }
      document.documentElement.classList.add('remove-scroll');
    });
  });
 
}



















