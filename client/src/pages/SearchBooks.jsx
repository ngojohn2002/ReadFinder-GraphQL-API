import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SAVE_BOOK } from "../utils/mutations";

const SearchBooks = () => {
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [saveBook] = useMutation(SAVE_BOOK);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchInput}`
      );

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const { items } = await response.json();

      const bookData = items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ["No author to display"],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks?.thumbnail || "",
      }));

      setSearchedBooks(bookData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveBook = async (bookId) => {
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

    try {
      await saveBook({
        variables: { input: bookToSave },
      });
      alert("Book saved!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="jumbotron text-light bg-dark">
        <div className="container">
          <h1>Search for Books!</h1>
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder="Search for a book"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit">Submit Search</button>
          </form>
        </div>
      </div>

      <div className="container">
        <h2>
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : "Search for a book to begin"}
        </h2>
        <div className="row">
          {searchedBooks.map((book) => {
            return (
              <div key={book.bookId} className="col-md-4">
                <div className="card mb-4">
                  {book.image ? (
                    <img
                      src={book.image}
                      alt={`The cover for ${book.title}`}
                      className="card-img-top"
                    />
                  ) : null}
                  <div className="card-body">
                    <h5 className="card-title">{book.title}</h5>
                    <p className="small">Authors: {book.authors.join(", ")}</p>
                    <p className="card-text">{book.description}</p>
                    <button
                      className="btn btn-primary btn-block"
                      onClick={() => handleSaveBook(book.bookId)}
                    >
                      Save this Book!
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchBooks;
