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

      // Another solution method
      // const tr = document.createElement("tr");
      // tbody.appendChild(tr);

      // const id = document.createElement("td");
      // id.innerHTML = i + 1;

      // const title = document.createElement("td");
      // title.innerHTML = t.title;

      // const price = document.createElement("td");
      // price.innerHTML = t.price;

      // const taxes = document.createElement("td");
      // taxes.innerHTML = t.taxes;

      // const ads = document.createElement("td");
      // ads.innerHTML = t.ads;

      // const discount = document.createElement("td");
      // discount.innerHTML = t.discount;

      // const total = document.createElement("td");
      // total.innerHTML = t.total;

      // const category = document.createElement("td");
      // category.innerHTML = t.category;

      // const updateBtn = document.createElement("td");
      // const btnUpdate = document.createElement("button");
      // btnUpdate.innerHTML = "Update";
      // updateBtn.appendChild(btnUpdate);

      // const deleteBtn = document.createElement("td");
      // const btnDelete = document.createElement("button");
      // btnDelete.innerHTML = "Delete";
      // deleteBtn.appendChild(btnDelete);

      // tr.appendChild(id);
      // tr.appendChild(title);
      // tr.appendChild(price);
      // tr.appendChild(taxes);
      // tr.appendChild(ads);
      // tr.appendChild(discount);
      // tr.appendChild(total);
      // tr.appendChild(category);
      // tr.appendChild(updateBtn);
      // tr.appendChild(deleteBtn);
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
const getSearchMood = (id) => {
  if (id == "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.placeholder = "Search By " + searchMood;

  search.addEventListener("blur", () => {
    search.placeholder = "Search";
  });

  search.focus();
  search.value = "";
  searchData();
};

// Search Data
const searchData = (value) => {
  let row = "";

  if (search.value) {
    for (let i = 0; i < dataPro.length; i++) {
      if (searchMood == "title") {
        if (dataPro[i].title.toLowerCase().includes(value.toLowerCase())) {
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
        if (dataPro[i].category.toLowerCase().includes(value.toLowerCase())) {
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
