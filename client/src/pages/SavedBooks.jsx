import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { REMOVE_BOOK } from "../utils/mutations";
import Auth from "../utils/auth";

const SavedBooks = () => {
  const { loading, data } = useQuery(GET_ME);
  const [removeBook, { error }] = useMutation(REMOVE_BOOK);

  const userData = data?.me || {};

  const handleDeleteBook = async (bookId) => {
    try {
      await removeBook({
        variables: { bookId },
        update: (cache) => {
          const { me } = cache.readQuery({ query: GET_ME });
          cache.writeQuery({
            query: GET_ME,
            data: {
              me: {
                ...me,
                savedBooks: me.savedBooks.filter(
                  (book) => book.bookId !== bookId
                ),
              },
            },
          });
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Saved Books</h2>
      {userData.savedBooks.map((book) => (
        <div key={book.bookId}>
          <p>{book.title}</p>
          <button onClick={() => handleDeleteBook(book.bookId)}>Delete</button>
        </div>
      ))}
      {error && <div>Failed to delete book</div>}
    </div>
  );
};

export default SavedBooks;
