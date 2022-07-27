let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let search = document.getElementById("search");
let tbody = document.getElementById("tbody");
let deleteAllBtn = document.getElementById("deleteAll");
let searchTitle = document.getElementById("searchTitle");
let searchCategory = document.getElementById("searchCategory");

let mood = "create";
let id;

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
let dataPro = [];

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
      title:
        title.value.charAt(0).toUpperCase() +
        title.value.slice(1).toLowerCase(),
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discount: discount.value,
      count: count.value,
      total: total.innerHTML,
      category:
        category.value.charAt(0).toUpperCase() +
        category.value.slice(1).toLowerCase(),
    };

    if (newPro.count <= 100) {
      if (mood === "create") {
        // count
        if (newPro.count > 1) {
          for (let i = 0; i < newPro.count; i++) {
            dataPro.push(newPro);
          }
        } else {
          dataPro.push(newPro);
        }
      } else {
        dataPro[id] = newPro;
        submit.innerHTML = "Create";
        count.style.display = "block";
        mood = "create";
      }
      clearData();
    }

    // save localstorage
    localStorage.setItem("product", JSON.stringify(dataPro));
  }

  showData();
});

// clear inputs
const clearData = () => {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
};

// read
const showData = () => {
  let row = "";

  if (dataPro.length > 0) {
    dataPro.map((t, i) => {
      row += `
      <tr>
          <td>${i + 1}</td>
          <td>${t.title}</td>
          <td>${t.price}</td>
          <td>${t.taxes}</td>
          <td>${t.ads}</td>
          <td>${t.discount}</td>
          <td>${t.total}</td>
          <td>${t.category}</td>
          <td><button onClick="updateData(${i})" id="update">Update</button></td>
          <td><button onClick="deleteProduct(${i})" id="delete">Delete</button></td>
        </tr>
      `;
      tbody.innerHTML = row;
    });

    // Create Delete All Button
    let btn = `
          <button onClick="deleteAll()" id="deleteAllBtn">Delete All (${dataPro.length})</button>
    `;
    deleteAllBtn.innerHTML = btn;
  } else {
    deleteAllBtn.innerHTML = "";
    tbody.innerHTML = "";
  }

  getTotal();
};
showData();

// delete
const deleteProduct = (i) => {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
};

// delete all
const deleteAll = () => {
  dataPro = [];
  localStorage.clear();
  submit.innerHTML = "Create";
  count.style.display = "block";
  mood = "create";
  clearData();
  showData();
};

// update
const updateData = (i) => {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  getTotal();
  category.value = dataPro[i].category;
  submit.innerHTML = "Update";
  count.style.display = "none";
  mood = "update";
  id = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
};

// search
let searchMood = "title";

// Get Search Mood
const getSearchMood = (e) => {
  if (e.target.id == "searchTitle") {
    searchMood = "title";
    search.placeholder = "Search By Title";
  } else {
    searchMood = "category";
    search.placeholder = "Search By Category";
  }

  search.addEventListener("blur", () => {
    search.placeholder = "Search";
  });

  search.focus();
  search.value = "";
  searchData();
};

// Search Data
const searchData = () => {
  let row = "";

  if (search.value) {
    for (let i = 0; i < dataPro.length; i++) {
      if (searchMood == "title") {
        if (
          dataPro[i].title.toLowerCase().includes(search.value.toLowerCase())
        ) {
          row += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onClick="updateData(${i})" id="update">Update</button></td>
                <td><button onClick="deleteProduct(${i})" id="delete">Delete</button></td>
            </tr>
            `;
        }
      } else {
        if (
          dataPro[i].category.toLowerCase().includes(search.value.toLowerCase())
        ) {
          row += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onClick="updateData(${i})" id="update">Update</button></td>
                <td><button onClick="deleteProduct(${i})" id="delete">Delete</button></td>
            </tr>
          `;
        }
      }
    }
    tbody.innerHTML = row;
  } else {
    showData();
  }
};

// Add Event Listeners
price.addEventListener("keyup", getTotal);
taxes.addEventListener("keyup", getTotal);
ads.addEventListener("keyup", getTotal);
discount.addEventListener("keyup", getTotal);
search.addEventListener("keyup", searchData);
searchTitle.addEventListener("click", getSearchMood);
searchCategory.addEventListener("click", getSearchMood);
