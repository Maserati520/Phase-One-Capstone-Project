// get elements from the page
const favoritesGrid = document.getElementById("favorites-grid");
const emptyMessage = document.getElementById("empty-message");

// get favorites from localStorage
function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
}

// save favorites to localStorage
function saveFavorites(favorites) {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

// remove a book from favorites
export function removeFromFavorites(bookKey) {
    let favorites = getFavorites();
    favorites = favorites.filter((book) => book.key !== bookKey);
    saveFavorites(favorites);
    displayFavorites();
}

// add a book to favorites
export function addToFavorites(book) {
    let favorites = getFavorites();

    // check if already in favorites
    let alreadySaved = favorites.find((b) => b.key === book.key);

    if (alreadySaved) {
        alert("Already in favorites!");
        return;
    }

    favorites.push(book);
    saveFavorites(favorites);
    alert("Added to favorites! ❤️");
}

// display favorites on the page
function displayFavorites() {

    if (!favoritesGrid || !emptyMessage) return;

    let favorites = getFavorites();

    // show or hide empty message
    if (favorites.length === 0) {
        emptyMessage.classList.remove("hidden");
        favoritesGrid.innerHTML = "";
        return;
    }

    emptyMessage.classList.add("hidden");

    // build the cards
    favoritesGrid.innerHTML = "";

    favorites.forEach((book) => {

        let cover = book.cover
            ? `https://covers.openlibrary.org/b/id/${book.cover}-M.jpg`
            : "https://via.placeholder.com/150x200?text=No+Cover";

        favoritesGrid.innerHTML += `
            <div class="bg-linen rounded-xl shadow p-4 flex flex-col items-center text-center">
                <img src="${cover}" alt="${book.title}" class="w-32 h-44 object-cover rounded mb-4"/>
                <h4 class="font-bold text-gray-900 text-sm mb-1">${book.title}</h4>
                <p class="text-gray-700 text-xs mb-4">${book.author}</p>
                <button
                    onclick="removeFromFavorites('${book.key}')"
                    class="bg-plum text-white text-sm px-4 py-2 rounded-full hover:bg-sand transition">
                    ❌ Remove
                </button>
            </div>
        `;

    });

}

// make removeFromFavorites available globally for onclick ← THIS WAS MISSING!
window.removeFromFavorites = removeFromFavorites;

// only run on favorites page
if (document.getElementById("favorites-grid")) {
    displayFavorites();
}
