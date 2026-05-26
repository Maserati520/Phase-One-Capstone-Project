// fetchBooks.js

export async function fetchBooks(query = "javascript") {

    try {

        let response = await fetch(
            `https://openlibrary.org/search.json?title=${query}&limit=12`
        );

        let data = await response.json();

        return data.docs;

    } catch(error) {

        console.log(error);
        return [];

    }

}