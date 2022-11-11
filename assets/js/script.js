var hamburger = document.querySelector('.hamburger'),
  header = document.querySelector('.header-content'),
  navList = document.querySelectorAll('.nav-list'),
  categoryList = document.querySelectorAll('.category-list a'),
  clientItems = document.querySelector('.clients-items'),
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
    if (contentList.dataset.list === key[1]) {
      contentList.classList.add('active-list');
    }
  })
  products.forEach(function (product) {
    var productCategory = product.dataset.category;
    if (key[1] === 'everything') {
      product.classList.remove('hide-content');
      product.classList.add('active-product');
    } else if (key[1] !== productCategory) {
      product.classList.remove('active-product');
      product.classList.add('hide-content');
    } else {
      product.classList.remove('hide-content');
      product.classList.add('active-product');
    }
  })
}
// condition use to avoid errors on other pages
if (priceForm) {
  sortProduct(navList, productList);
  sortProduct(categoryList, productList);
  // price range
  var thumbsize = 14;
  function draw(slider, splitvalue) {
    /* set function vars */
    var min = slider.querySelector('.min'),
      max = slider.querySelector('.max'),
      lower = slider.querySelector('.min-price'),
      upper = slider.querySelector('.max-price'),
      thumbsize = parseInt(slider.getAttribute('data-thumbsize')),
      rangewidth = parseInt(slider.getAttribute('data-rangewidth')),
      rangemin = parseInt(slider.getAttribute('data-rangemin')),
      rangemax = parseInt(slider.getAttribute('data-rangemax'));
    /* set min and max attributes */
    min.setAttribute('max', splitvalue);
    max.setAttribute('min', splitvalue);
    /* set css */
    min.style.width = parseInt(thumbsize + ((splitvalue - rangemin) / (rangemax - rangemin)) * (rangewidth - (2 * thumbsize))) + 'px';
    max.style.width = parseInt(thumbsize + ((rangemax - splitvalue) / (rangemax - rangemin)) * (rangewidth - (2 * thumbsize))) + 'px';
    min.style.left = '0px';
    max.style.left = parseInt(min.style.width) + 'px';
    /* correct for 1 off at the end */
    if (max.value > (rangemax - 1)) max.setAttribute('data-value', rangemax);
    /* write value of min and max price */
    max.value = max.getAttribute('data-value');
    min.value = min.getAttribute('data-value');
    lower.innerText = min.getAttribute('data-value');
    upper.innerText = max.getAttribute('data-value');
  }
  /* set function vars */
  var min = priceForm.querySelector('.min'),
    max = priceForm.querySelector('.max'),
    rangemin = parseInt(min.getAttribute('min')),
    rangemax = parseInt(max.getAttribute('max')),
    avgvalue = (rangemin + rangemax) / 2,
    legendnum = priceForm.getAttribute('data-legendnum');
  /* set data-values */
  min.setAttribute('data-value', rangemin);
  max.setAttribute('data-value', rangemax);
  /* set data vars */
  priceForm.setAttribute('data-rangemin', rangemin);
  priceForm.setAttribute('data-rangemax', rangemax);
  priceForm.setAttribute('data-thumbsize', thumbsize);
  priceForm.setAttribute('data-rangewidth', priceForm.offsetWidth);
  /* dynamic price */
  var lower = priceForm.querySelector('.min-price');
  var upper = priceForm.querySelector('.max-price');
  lower.classList.add('lower', 'value');
  upper.classList.add('upper', 'value');
  lower.innerText = rangemin;
  upper.innerText = rangemax;
  draw(priceForm, avgvalue);
  /* events */
  min.addEventListener("input", function () { update(min); });
  max.addEventListener("input", function () { update(max); });
  function update(el) {
    /* set function vars */
    var slider = el.parentElement.parentElement,
      min = slider.querySelector('.min'),
      max = slider.querySelector('.max'),
      minvalue = Math.floor(min.value),
      maxvalue = Math.floor(max.value);
    /* set inactive values before draw */
    min.setAttribute('data-value', minvalue);
    max.setAttribute('data-value', maxvalue);
    var avgvalue = (minvalue + maxvalue) / 2;
    /* draw */
    draw(slider, avgvalue);
  }
  // filter price submit function
  priceForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var minPrice = Number(priceForm.querySelector('.min').value),
      maxPrice = Number(priceForm.querySelector('.max').value),
      activeList = document.querySelector('.active-list');
    productList.forEach(function (product) {
      var productMin = Number(product.dataset.min),
        productMax = Number(product.dataset.max);
      if ((minPrice < productMin || maxPrice > productMax) && (product.dataset.category == activeList.dataset.list)) {
        product.classList.remove('hide-content');
      } else {
        product.classList.add('hide-content');
      }
    })
  })
}
// category page function end

// modal function
// this condition use to avoid errors on other pages
if (clientItems) {
  // active class adding to access modal on home page
  productList.forEach(function (list) {
    list.classList.add('active-product');
  })
}
// this condition use to avoid errors on login page
if (header) {
  var activeList = document.querySelectorAll('.active-product'),
    productImage = document.querySelectorAll('.active-product img');
  // Image function
  productImage.forEach(function (image, i) {
    var imageSource = image.src;
    image.index = i;
    image.addEventListener('click', function () {
      var imageModal = document.createElement('div');
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
      // modal variables
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
        // modal slider function
        nextBtn.addEventListener('click', function () {
          currentIndex++;
          if (currentIndex > activeList.length - 1) {
            currentIndex = 0;
          }
          slider();
        });
        prevBtn.addEventListener('click', function () {
          currentIndex--;
          if (currentIndex < 0) {
            currentIndex = activeList.length - 1;
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

// logo slider function
if (clientItems) {
  var containerDimension = clientItems.getBoundingClientRect(),
    clientList = document.querySelectorAll('.clients-list'),
    containerWidth = containerDimension.width,
    logoPrev = document.querySelector('.prev'),
    logoNext = document.querySelector('.next'),
    interval = setInterval(autoPlay, 3000);
  // autoplay slider function
  function autoPlay() {
    clientItems.scrollLeft += containerWidth;
    var listLength = clientList.length - 1;
    var lists = clientList[listLength].getBoundingClientRect().right,
      clientItemsWidth = clientItems.clientWidth,
      widthAdd = clientItems.getBoundingClientRect().left + clientItemsWidth;
    if (widthAdd == lists) {
      clientItems.scrollBy(-(listLength * clientList[0].clientWidth), 0);
    }
  }
  // logo slider function for all breakpoints
  function logoSlider(screenOne, screenTwo, screenThree, screenFour, screenFive, screenSix, screenSeven) {
    if (window.innerWidth >= 1245) {
      clientItems.scrollBy(screenSeven, 0);
    } else if ((window.innerWidth < 1245) && (window.innerWidth >= 1012)) {
      clientItems.scrollBy(screenSix, 0);
    } else if ((window.innerWidth < 1012) && (window.innerWidth >= 844)) {
      clientItems.scrollBy(screenFive, 0);
    } else if ((window.innerWidth < 844) && (window.innerWidth >= 676)) {
      clientItems.scrollBy(screenFour, 0);
    } else if ((window.innerWidth < 676) && (window.innerWidth >= 510)) {
      clientItems.scrollBy(screenThree, 0);
    } else if ((window.innerWidth < 510) && (window.innerWidth >= 340)) {
      clientItems.scrollBy(screenTwo, 0);
    } else if (window.innerWidth < 340) {
      clientItems.scrollBy(screenOne, 0);
    }
  }
  // previous logo button function
  logoPrev.addEventListener('click', function (e) {
    e.preventDefault();
    logoSlider(-160, -320, -320, -440, -800, -960, -1120);
    clearInterval(interval);
    interval = setInterval(autoPlay, 3000);
  });
  // Next logo button function
  logoNext.addEventListener('click', function (e) {
    e.preventDefault();
    logoSlider(160, 320, 320, 440, 800, 960, 1120);
    clearInterval(interval);
    interval = setInterval(autoPlay, 3000);
  });
}


















