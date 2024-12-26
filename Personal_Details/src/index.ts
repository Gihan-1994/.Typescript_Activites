console.log("hello again");
//Genaric Class
class Generic_Class_Array<T> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    getItems(): T[] {
        return this.items;
    }
}
// Func for add btn
 function collect_Form_Data ():object{
    

    // Input retrived from 2 methods
    const nameElement : HTMLInputElement| null =(document.getElementById("name") as HTMLInputElement);
    const name :string = nameElement? nameElement.value : ""; 
    
    const age = parseInt((document.getElementById("age") as HTMLInputElement)?.value) || 0;
    const colorElement :HTMLSelectElement| null = (document.getElementById("color") as HTMLSelectElement);
    const color = colorElement? colorElement.value : "";
     
     const email = (document.getElementById("email") as HTMLInputElement)?.value || "";

  
    const selectedFood: string[] = [];
    const foodCheckboxes = document.querySelectorAll<HTMLInputElement>(
        "input[name='food[]']:checked"
    );
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
 const formDataArray = new Generic_Class_Array<object>(); 
  

  document.getElementById("addButton")?.addEventListener("click", () => {
  // insert inputs to array
    formDataArray.add(collect_Form_Data());

    // clearing all inputs
    (document.getElementById("name") as HTMLInputElement).value = "";
    (document.getElementById("age") as HTMLInputElement).value = "";
    (document.getElementById("color") as HTMLSelectElement).value = "";
    (document.getElementById("email") as HTMLInputElement).value = "";

    // Uncheck all food checkboxes
    const food_Check_boxes = document.querySelectorAll<HTMLInputElement>("input[name='food[]']");
    food_Check_boxes.forEach((checkbox) => checkbox.checked = false);  
})
// for debugging porpose
console.log(formDataArray.getItems());

// Display data
function Display_FormData(formDataArray: object[]): void {
    
    const resultContainer = document.querySelector(".result-container");

    if (resultContainer) {
        
        resultContainer.innerHTML = `<h2>Submitted Information:</h2>`;
    }
// using enums for store images
    enum FoodImages {
        pizza = "https://cdn.pixabay.com/photo/2023/08/12/02/42/ai-generated-8184596_640.png",
        burger = "https://cdn.pixabay.com/photo/2012/04/13/01/51/hamburger-31775_640.png",
        pasta = "https://example.com/images/pasta.jpg",
        salad = "https://example.com/images/salad.jpg",
        iceCream = "https://example.com/images/icecream.jpg",
        default = "https://example.com/images/default.jpg" 
    }

    // retriving data from the array
    formDataArray.forEach((formData, index) => {
        const data = formData as {
            name: string;
            age: number;
            color: string;
            email: string;
            selectedFood: string[];
        };

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

        
        data.selectedFood.forEach((food:string) => {
            const foodImage = document.createElement("img");
            
            foodImage.src = FoodImages[food as keyof typeof FoodImages] || FoodImages.default;
            foodImage.alt = food;
            foodImage.style.width = "70px"; 
            foodImage.style.height = "60px";
            foodImageContainer.appendChild(foodImage);
        });

        // apending div containers to mother containers
        entryData.appendChild(foodImageContainer);

         entryData.classList.add("entry-data");

        entryLabel.addEventListener("click", () => {
            
           
            if(entryData.style.display === "block")
            
            entryData.style.display = "none"; 
            else{
            const allEntryData = document.querySelectorAll(".entry-data");
            allEntryData.forEach((data) => {
                (data as HTMLElement).style.display = "none"; 
            });
            entryData.style.display = "block";
        }
        });

        entry.appendChild(entryLabel);
        entry.appendChild(entryData);


        // finally apending data to created result container
        resultContainer?.appendChild(entry);
        document.querySelector(".form-container")?.setAttribute("style", "display: none;");
         resultContainer?.setAttribute("style", "display: block;");
    });

   
    
}

document.getElementById("submit")?.addEventListener("click", () => {
    // Display the form data from the array
    
    Display_FormData(formDataArray.getItems());
    
});















 

