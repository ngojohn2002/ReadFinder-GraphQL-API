import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { REMOVE_BOOK } from "../utils/mutations";
import Auth from "../utils/auth";
import { removeBookId } from "../utils/localStorage";

const SavedBooks = () => {
  const { loading, data } = useQuery(GET_ME);
  const [removeBook] = useMutation(REMOVE_BOOK);
  const userData = data?.me || {};

  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removeBook({
        variables: { bookId },
        update: (cache, { data: { removeBook } }) => {
          try {
            cache.writeQuery({
              query: GET_ME,
              data: { me: removeBook },
            });
          } catch (e) {
            console.error(e);
          }
        },
      });

      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="text-light bg-dark p-5">
        <h1>Viewing saved books!</h1>
      </div>
      <div>
        {userData.savedBooks?.length ? (
          <>
            <h2>
              Viewing {userData.savedBooks.length} saved{" "}
              {userData.savedBooks.length === 1 ? "book" : "books"}:
            </h2>
            <div>
              {userData.savedBooks.map((book) => (
                <div key={book.bookId}>
                  <h3>{book.title}</h3>
                  <p>{book.authors.join(", ")}</p>
                  <p>{book.description}</p>
                  <button onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <h2>You have no saved books!</h2>
        )}
      </div>
    </>
  );
};

export default SavedBooks;
