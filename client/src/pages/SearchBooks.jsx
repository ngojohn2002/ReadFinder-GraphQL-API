import React, { useState } from "react";
import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { SAVE_BOOK } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
import NoImagePlaceholder from "../assets/no-image.png"; 

const SearchBooks = () => {
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [saveBook] = useMutation(SAVE_BOOK);
  const { data: userData } = useQuery(QUERY_ME);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchInput}`
      );
      const { items } = await response.json();

      const bookData = items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ["No author to display"],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks?.thumbnail || NoImagePlaceholder, // Use placeholder if no image
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
        refetchQueries: [{ query: QUERY_ME }],
      });

      const updatedBooks = searchedBooks.map((book) =>
        book.bookId === bookId ? { ...book, saved: true } : book
      );
      setSearchedBooks(updatedBooks);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Container>
        <h1>Search for Books!</h1>
        <Form onSubmit={handleFormSubmit}>
          <Row>
            <Col xs={12} md={8}>
              <Form.Control
                name="searchInput"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                type="text"
                size="lg"
                placeholder="Search for a book"
              />
            </Col>
            <Col xs={12} md={4}>
              <Button type="submit" variant="success" size="lg">
                Submit Search
              </Button>
            </Col>
          </Row>
        </Form>

        <Row>
          {searchedBooks.map((book) => {
            return (
              <Col md="4" key={book.bookId} className="my-3">
                <Card
                  style={{
                    height: "800px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant="top"
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: "500px",
                      objectFit: "cover",
                    }}
                  />
                  <Card.Body style={{ flexGrow: 1, overflowY: "auto" }}>
                    <Card.Title>{book.title}</Card.Title>
                    <p className="small">Authors: {book.authors.join(", ")}</p>
                    <Card.Text>{book.description}</Card.Text>
                  </Card.Body>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={book.saved}
                      onClick={() => handleSaveBook(book.bookId)}
                      variant={book.saved ? "secondary" : "primary"}
                      className="m-2"
                    >
                      {book.saved ? "Book Saved!" : "Save this Book!"}
                    </Button>
                  )}
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SearchBooks;
