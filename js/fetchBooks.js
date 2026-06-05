export async function fetchBooks(query = "Love") {
  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}&limit=12`
    );

    if (!response.ok) {
      throw new Error(`Open Library request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.docs || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}
