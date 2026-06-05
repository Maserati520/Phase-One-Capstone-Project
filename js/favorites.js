const favoritesGrid = document.getElementById("favorites-grid");
const emptyMessage = document.getElementById("empty-message");

function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

function saveFavorites(favorites) {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function getCoverUrl(coverId) {
  return coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : "https://via.placeholder.com/150x200?text=No+Cover";
}

export function removeFromFavorites(bookKey) {
  const favorites = getFavorites().filter((book) => book.key !== bookKey);
  saveFavorites(favorites);
  displayFavorites();
}

export function addToFavorites(book) {
  const favorites = getFavorites();
  const alreadySaved = favorites.find((savedBook) => savedBook.key === book.key);

  if (alreadySaved) {
    alert("Already in favorites!");
    return;
  }

  favorites.push(book);
  saveFavorites(favorites);
  alert("Added to favorites!");
}

function displayFavorites() {
  if (!favoritesGrid || !emptyMessage) return;

  const favorites = getFavorites();

  if (favorites.length === 0) {
    emptyMessage.classList.remove("hidden");
    favoritesGrid.innerHTML = "";
    return;
  }

  emptyMessage.classList.add("hidden");
  favoritesGrid.innerHTML = "";

  favorites.forEach((book) => {
    const card = document.createElement("div");
    card.className = "bg-linen rounded-xl shadow p-4 flex flex-col items-center text-center";

    const image = document.createElement("img");
    image.src = getCoverUrl(book.cover);
    image.alt = book.title || "Book cover";
    image.className = "w-32 h-44 object-cover rounded mb-4";

    const title = document.createElement("h4");
    title.className = "font-bold text-gray-900 text-sm mb-1";
    title.textContent = book.title || "Untitled";

    const author = document.createElement("p");
    author.className = "text-gray-700 text-xs mb-4";
    author.textContent = book.author || "Unknown Author";

    const button = document.createElement("button");
    button.className = "bg-plum text-white text-sm px-4 py-2 rounded-full hover:bg-sand transition";
    button.textContent = "Remove";
    button.addEventListener("click", () => removeFromFavorites(book.key));

    card.append(image, title, author, button);
    favoritesGrid.appendChild(card);
  });
}

if (favoritesGrid) {
  displayFavorites();
}
