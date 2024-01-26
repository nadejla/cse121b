/* W02-Task - Profile Home Page */

/* Step 1 - Setup type tasks - no code required */

/* Step 2 - Variables */

const fullName = "Nadine Lugo Salas";
let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let profilePicture = "images/portrait.png";

/* Step 3 - Element Variables */

let nameElement = document.getElementById("name");
let foodElement = document.getElementById("food");
let yearElement = document.querySelector("#year");
let imageElement = document.querySelector("img");

/* Step 4 - Adding Content */

nameElement.innerHTML = `<strong>${fullName}</strong>`;
yearElement.textContent = `${currentYear}`;
imageElement.setAttribute(`src`, profilePicture);
imageElement.setAttribute(`alt`, `Profile image of ${fullName}`);

/* Step 5 - Array */

let favoriteFoods = ["Frijoles Charros", "Bean Pupusas", "Ice Cream", "Lemon Chicken Salad"]
foodElement.innerHTML = `${favoriteFoods}`;
let anotherFood = "Chicken Tikka Masala";
favoriteFoods.push(anotherFood);
foodElement.innerHTML += `<br>${favoriteFoods}`;
favoriteFoods.shift();
foodElement.innerHTML += `<br>${favoriteFoods}`;
favoriteFoods.pop();
foodElement.innerHTML += `<br>${favoriteFoods}`;







