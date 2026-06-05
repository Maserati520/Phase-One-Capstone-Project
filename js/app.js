import { fetchBooks } from "./fetchBooks.js";
import { addToFavorites } from "./favorites.js";

const booksGrid = document.getElementById("books-grid");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

function showLoading() {
  let skeletons = "";

  for (let i = 0; i < 12; i++) {
    skeletons += `
      <div class="bg-linen rounded-xl shadow p-4 flex flex-col items-center animate-pulse">
        <div class="w-32 h-44 bg-sand rounded mb-4"></div>
        <div class="w-24 h-3 bg-sand rounded mb-2"></div>
        <div class="w-16 h-3 bg-sand rounded mb-4"></div>
        <div class="w-28 h-8 bg-sand rounded-full"></div>
      </div>
    `;
  }

  booksGrid.innerHTML = skeletons;
}

function getCoverUrl(coverId) {
  return coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : "https://via.placeholder.com/150x200?text=No+Cover";
}

function displayBooks(books) {
  booksGrid.innerHTML = "";

  if (books.length === 0) {
    booksGrid.innerHTML = `
      <p class="text-gray-800 text-xl font-medium col-span-4">
        No books found. Try another search!
      </p>
    `;
    return;
  }

  books.forEach((book) => {
    const author = book.author_name ? book.author_name[0] : "Unknown Author";
    const card = document.createElement("div");
    card.className = "bg-linen rounded-xl shadow p-4 flex flex-col items-center text-center";

    const image = document.createElement("img");
    image.src = getCoverUrl(book.cover_i);
    image.alt = book.title || "Book cover";
    image.className = "w-32 h-44 object-cover rounded mb-4";

    const title = document.createElement("h4");
    title.className = "font-bold text-gray-900 text-sm mb-1";
    title.textContent = book.title || "Untitled";

    const authorText = document.createElement("p");
    authorText.className = "text-gray-700 text-xs mb-4";
    authorText.textContent = author;

    const button = document.createElement("button");
    button.className = "bg-plum text-white text-sm px-4 py-2 rounded-full hover:bg-sand transition";
    button.textContent = "Add to Favorites";
    button.addEventListener("click", () => {
      addToFavorites({
        key: book.key,
        title: book.title || "Untitled",
        author,
        cover: book.cover_i || "",
      });

      button.textContent = "Added to Favorites";
      button.classList.add("opacity-70", "cursor-not-allowed");
      button.disabled = true;
    });

    card.append(image, title, authorText, button);
    booksGrid.appendChild(card);
  });
}

async function loadBooks(query) {
  showLoading();
  const books = await fetchBooks(query);
  displayBooks(books);
}

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query === "") return;
  loadBooks(query);
});

searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const query = searchInput.value.trim();
    if (query === "") return;
    loadBooks(query);
  }
});

loadBooks("romance");
