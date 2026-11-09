'use strict';
// Her skal vi skrive vores søge-, sortering- og filtreringskoder
function filtrerProdukter() {
// Lokal variabel som er en kopi af produktlisten.
let filteredProducts = [...products];


//------- Håndtering af søgfelt ------//
const
searchText=document.getElementById("search-input").value.toLowerCase().trim();

if (searchText) {
filteredProducts = filteredProducts.filter(product =>product.title.toLowerCase().includes(searchText)|| 
product.description.toLowerCase().includes(searchText)||
product.category.toLowerCase().includes(searchText)
);
}

//----------Håndtering af filtreringspanel---------//
const categories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(cb =>
    cb.value);
    const  stemning = Array.from(document.querySelectorAll('input[name="stemning"]:checked')).map(cb =>
    cb.value);
const minPlayers = parseFloat(document.getElementById('min-players').value)
const maxPlayers = parseFloat(document.getElementById('max-players').value)
const rating = document.querySelector('input[name="rating"]:checked')?.value || null;

if (categories.length>0) {
filteredProducts = filteredProducts.filter(product => 
    categories.includes(product.category)
);
}
if (stemning.length>0) {
filteredProducts = filteredProducts.filter(product => 
    stemning.includes(product.stemning)
);
}
if (!isNaN(minPlayers)) {
filteredProducts = filteredProducts.filter(product => 
    product.players >= minPlayers
);
}
if (!isNaN(maxPlayers)) {
filteredProducts = filteredProducts.filter(product => 
    product.players <= maxPlayers
);
}
if (rating !== null) {
filteredProducts = filteredProducts.filter(product =>
    product.rating >= rating
);
}

//----------------- Håndtering af predefineret sorting -------------//
const sorterEfter = document.getElementById("predefined-search").value;
if (sorterEfter && sorterEfter === "svaerhedsgrad nem") {
    filteredProducts.sort((a,b) => a.rating - b.rating) ;
}
if (sorterEfter && sorterEfter === "svaerhedsgrad svaer") {
    filteredProducts.sort((a,b) => b.rating - a.rating) ;
}    
if (sorterEfter && sorterEfter === "pris-stigende") {
    filteredProducts.sort((a,b) => a.players - b.players) ;
}
if (sorterEfter && sorterEfter === "pris-falende") {
    filteredProducts.sort((a,b) => b.players - a.players) ;
}

displayProducts (filteredProducts);
};

document.getElementById("search-input").addEventListener("input",
    filtrerProdukter);
document.getElementById("predefined-search").addEventListener("change",
    filtrerProdukter);
document.getElementById("apply-filters").addEventListener("click", function() {
filtrerProdukter();
closeFilterPanel();
});
