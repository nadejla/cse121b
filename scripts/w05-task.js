/* W05: Programming Tasks */

/* Declare and initialize global variables */
const templesElement = document.querySelector('#temples')
let templeList = []

/* async displayTemples Function */
const displayTemples = async (temples) => {
    temples.forEach(temple => {
        let article = document.createElement('article');
        let h3 = document.createElement('h3');
        h3.textContent = temple.templeName;
        let img = document.createElement('img');
        img.setAttribute(`src`, temple.imageUrl)
        img.setAttribute(`alt`, temple.location)
        article.appendChild(h3)
        article.appendChild(img)
        templesElement.appendChild(article);
    });
};

/* async getTemples Function using fetch()*/

const getTemples = async () => {
    const response = await fetch('https://byui-cse.github.io/cse121b-ww-course/resources/temples.json');
    templeList = await response.json();
    displayTemples(templeList);
};

/* reset Function */
function reset() {
    templesElement.innerHTML = '';
};

/* filterTemples Function */

function filterTemples(temples) {
    reset();
    let filter = document.querySelector('#filtered').value;
    switch (filter) {
        case "utah":
            console.log('Utah Filter');
            let utahTemples = temples.filter(temple => temple.location.includes('Utah'))
            console.log(utahTemples);
            displayTemples(utahTemples);
            break;
        case "notutah":
            console.log('Non-Utah Filter');
            let nonUtahTemples = temples.filter(temple => !temple.location.includes('Utah'))
            console.log(nonUtahTemples);
            displayTemples(nonUtahTemples)
            break;
        case "older":
            console.log('Older Filter');
            let olderTemples = temples.filter(temple => new Date(temple.dedicated) < new Date(1950, 0, 1));
            console.log(olderTemples)
            displayTemples(olderTemples)  
            break; 
        case "all":
            console.log('All Filter');
            console.log(temples)
            displayTemples(temples);
    }
};

/* Event Listener */

document.querySelector('#filtered').addEventListener('change', () => { filterTemples(templeList) });

getTemples();