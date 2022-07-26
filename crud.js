let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

// get total
const getTotal = () => {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
};

// create product
let dataPro;

if (localStorage.product) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

submit.addEventListener("click", () => {
  if (
    title.value &&
    price.value &&
    taxes.value &&
    ads.value &&
    discount.value &&
    category.value
  ) {
    const newPro = {
      title: title.value,
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discount: discount.value,
      total: total.innerHTML,
      category: category.value,
    };

    dataPro.push(newPro);

    // save localstorage
    localStorage.setItem("product", JSON.stringify(dataPro));

    console.log(dataPro);
  }

  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  category.value = "";
  count.value = "";
  total.style.background = "#a00d02";
});

// save localstorage
// clear inputs
// read
// count
// delete
// update
// search
// clean data
