import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SAVE_BOOK } from "../utils/mutations";
import Auth from "../utils/auth";

const SearchBooks = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [saveBook, { error }] = useMutation(SAVE_BOOK);

  const handleSaveBook = async (bookData) => {
    if (!Auth.loggedIn()) {
      return false;
    }

    try {
      await saveBook({
        variables: { bookData },
        update: (cache, { data: { saveBook } }) => {
          cache.writeQuery({
            query: GET_ME,
            data: { me: saveBook },
          });
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h2>Search Books</h2>
      {searchResults.map((book) => (
        <div key={book.bookId}>
          <p>{book.title}</p>
          <button onClick={() => handleSaveBook(book)}>Save</button>
        </div>
      ))}
      {error && <div>Failed to save book</div>}
    </div>
  );
};

export default SearchBooks;
