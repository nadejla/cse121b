/* LESSON 3 - Programming Tasks */

/* Profile Object  */

let myProfile = {
    name: "Nadine Lugo Salas",
    photo: "images/portrait.png",
    favoriteFoods: [
        'Frijoles Charros',
        'Bean Pupusas',
        'Ice Cream',
        'Lemon Chicken Salad',
        'Chicken Tikka Masala'
    ],
    hobbies: [
        'Building things',
        'Puzzles',
        'Crafts',
        'Gardening',
        'Movies',
        'Learning'
    ],
    placesLived: []
};

/* Populate Profile Object with placesLive objects */

myProfile.placesLived.push(
    {
        place: 'Monterrey, Mexico',
        length: '3 years'
    }
);

myProfile.placesLived.push(
    {
        place: 'Laredo, Texas',
        length: '17 years'
    }
);

myProfile.placesLived.push(
    {
        place: 'Provo/Orem, Utah',
        length: '13.5 years'
    }
);

myProfile.placesLived.push(
    {
        place: 'Oregon, USA',
        length: '1.5 years'
    }
);

/* DOM Manipulation - Output */

/* Name */

document.querySelector('#name').textContent = myProfile.name;

/* Photo with attributes */

document.querySelector('#photo').setAttribute('src', myProfile.photo);
document.querySelector('#photo').setAttribute('alt', myProfile.name);

/* Favorite Foods List*/

myProfile.favoriteFoods.forEach(food => {
    let li = document.createElement('li');
    li.textContent = food;
    document.querySelector('#favorite-foods').appendChild(li);
});

/* Hobbies List */

myProfile.hobbies.forEach(hobby => {
    let li = document.createElement('li');
    li.textContent = hobby;
    document.querySelector('#hobbies').appendChild(li);
});

/* Places Lived DataList */

myProfile.placesLived.forEach(placeLived =>{
    let dt = document.createElement('dt');
    dt.textContent = placeLived.place;
    let dd = document.createElement('dd');
    dd.textContent = placeLived.length;
    document.querySelector('#places-lived').append(dt, dd);
});
