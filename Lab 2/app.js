import { fetchBooks } from './fetchBooks.js';
import { addToFavorites } from './favorites.js';

// get elements from page
const booksGrid = document.getElementById("books-grid");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

// show skeleton loader
function showLoading() {
    let skeletons = "";

    for (let i = 0; i < 12; i++) {
        skeletons += `
            <div class="bg-linen rounded-xl shadow p-4 flex flex-col items-center animate-pulse">
                <!-- fake cover -->
                <div class="w-32 h-44 bg-sand rounded mb-4"></div>
                <!-- fake title -->
                <div class="w-24 h-3 bg-sand rounded mb-2"></div>
                <!-- fake author -->
                <div class="w-16 h-3 bg-sand rounded mb-4"></div>
                <!-- fake button -->
                <div class="w-28 h-8 bg-sand rounded-full"></div>
            </div>
        `;
    }

    booksGrid.innerHTML = skeletons;
}

// display books as cards
function displayBooks(books) {

    booksGrid.innerHTML = "";

    // if no books found
    if (books.length === 0) {
        booksGrid.innerHTML = `
            <p class="text-gray-800 text-xl font-medium col-span-4">
                No books found. Try another search!
            </p>
        `;
        return;
    }

    books.forEach((book) => {

        // get cover image
        let cover = book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : "https://via.placeholder.com/150x200?text=No+Cover";

        // get author
        let author = book.author_name
            ? book.author_name[0]
            : "Unknown Author";

        booksGrid.innerHTML += `
            <div class="bg-linen rounded-xl shadow p-4 flex flex-col items-center text-center">
                <img
                    src="${cover}"
                    alt="${book.title}"
                    class="w-32 h-44 object-cover rounded mb-4"
                />
                <h4 class="font-bold text-gray-900 text-sm mb-1">${book.title}</h4>
                <p class="text-gray-700 text-xs mb-4">${author}</p>
                <button
                    id="btn-${book.key.replace(/\//g, "")}"
                    onclick="handleAddToFavorites('${book.key}', '${book.title.replace(/'/g, "")}', '${author}', '${book.cover_i || ""}')"
                    class="bg-plum text-white text-sm px-4 py-2 rounded-full hover:bg-sand transition">
                    🤍 Add to Favorites
                </button>
            </div>
        `;

    });

}

// handle add to favorites
window.handleAddToFavorites = function(key, title, author, cover) {
    addToFavorites({ key, title, author, cover });

    // turn heart red
    let btnId = key.replace(/\//g, "");
    let btn = document.getElementById(`btn-${btnId}`);
    if (btn) {
        btn.innerHTML = " Added to Favorites";
        btn.classList.add("opacity-70", "cursor-not-allowed");
        btn.disabled = true;
    }
}

// load books function
async function loadBooks(query) {
    showLoading();
    let books = await fetchBooks(query);
    displayBooks(books);
}

// search button click
searchBtn.addEventListener("click", () => {
    let query = searchInput.value.trim();
    if (query === "") return;
    loadBooks(query);
});

// search on enter key
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        let query = searchInput.value.trim();
        if (query === "") return;
        loadBooks(query);
    }
});

// load default books on startup
loadBooks("romance");
