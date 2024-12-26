"use strict";
var _a, _b;
console.log("hello again");
//Genaric Class
class Generic_Class_Array {
    constructor() {
        this.items = [];
    }
    add(item) {
        this.items.push(item);
    }
    getItems() {
        return this.items;
    }
}
// Func for add btn
function collect_Form_Data() {
    var _a, _b;
    // Input retrived from 2 methods
    const nameElement = document.getElementById("name");
    const name = nameElement ? nameElement.value : "";
    const age = parseInt((_a = document.getElementById("age")) === null || _a === void 0 ? void 0 : _a.value) || 0;
    const colorElement = document.getElementById("color");
    const color = colorElement ? colorElement.value : "";
    const email = ((_b = document.getElementById("email")) === null || _b === void 0 ? void 0 : _b.value) || "";
    const selectedFood = [];
    const foodCheckboxes = document.querySelectorAll("input[name='food[]']:checked");
    foodCheckboxes.forEach((checkbox) => selectedFood.push(checkbox.value));
    const formData = {
        name,
        age,
        color,
        selectedFood,
        email,
    };
    return formData;
}
// creating new array object from genaric class
const formDataArray = new Generic_Class_Array();
(_a = document.getElementById("addButton")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    // insert inputs to array
    formDataArray.add(collect_Form_Data());
    // clearing all inputs
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("color").value = "";
    document.getElementById("email").value = "";
    // Uncheck all food checkboxes
    const food_Check_boxes = document.querySelectorAll("input[name='food[]']");
    food_Check_boxes.forEach((checkbox) => checkbox.checked = false);
});
// for debugging porpose
console.log(formDataArray.getItems());
// Display data
function Display_FormData(formDataArray) {
    const resultContainer = document.querySelector(".result-container");
    if (resultContainer) {
        resultContainer.innerHTML = `<h2>Submitted Information:</h2>`;
    }
    // using enums for store images
    let FoodImages;
    (function (FoodImages) {
        FoodImages["pizza"] = "https://example.com/images/pizza.jpg";
        FoodImages["burger"] = "https://example.com/images/burger.jpg";
        FoodImages["pasta"] = "https://example.com/images/pasta.jpg";
        FoodImages["salad"] = "https://example.com/images/salad.jpg";
        FoodImages["iceCream"] = "https://example.com/images/icecream.jpg";
        FoodImages["default"] = "https://example.com/images/default.jpg";
    })(FoodImages || (FoodImages = {}));
    // retriving data from the array
    formDataArray.forEach((formData, index) => {
        var _a;
        const data = formData;
        // creating new dynamic elements for output
        const entry = document.createElement("div");
        const entryLabel = document.createElement("label");
        entryLabel.classList.add("entry-label");
        entryLabel.textContent = `Entry ${index + 1}`;
        entryLabel.style.cursor = "pointer";
        entry.style.backgroundColor = data.color;
        entry.style.padding = "10px";
        entry.style.margin = "10px 0";
        //  output data
        const entryData = document.createElement("div");
        entryData.style.display = "none";
        entryData.innerHTML = `
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Age:</strong> ${data.age}</p>
            <p><strong>Preferred Color:</strong> ${data.color}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Food Items:</strong> ${data.selectedFood.join(", ")}</p>
        `;
        //new dynamic elements for images  
        const foodImageContainer = document.createElement("div");
        foodImageContainer.style.display = "flex";
        foodImageContainer.style.gap = "10px";
        data.selectedFood.forEach((food) => {
            const foodImage = document.createElement("img");
            foodImage.src = FoodImages[food] || FoodImages.default;
            foodImage.alt = food;
            foodImage.style.width = "70px";
            foodImage.style.height = "60px";
            foodImageContainer.appendChild(foodImage);
        });
        // apending div containers to mother containers
        entryData.appendChild(foodImageContainer);
        entryData.classList.add("entry-data");
        entryLabel.addEventListener("click", () => {
            if (entryData.style.display === "block")
                entryData.style.display = "none";
            else {
                const allEntryData = document.querySelectorAll(".entry-data");
                allEntryData.forEach((data) => {
                    data.style.display = "none";
                });
                entryData.style.display = "block";
            }
        });
        entry.appendChild(entryLabel);
        entry.appendChild(entryData);
        // finally apending data to created result container
        resultContainer === null || resultContainer === void 0 ? void 0 : resultContainer.appendChild(entry);
        (_a = document.querySelector(".form-container")) === null || _a === void 0 ? void 0 : _a.setAttribute("style", "display: none;");
        resultContainer === null || resultContainer === void 0 ? void 0 : resultContainer.setAttribute("style", "display: block;");
    });
}
(_b = document.getElementById("submit")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    // Display the form data from the array
    Display_FormData(formDataArray.getItems());
});
