import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { SAVE_BOOK } from "../utils/mutations";
import Auth from "../utils/auth";
import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";

const SearchBooks = () => {
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [savedBookIds, setSavedBookIds] = useState([]);

  const [saveBook] = useMutation(SAVE_BOOK);

  useEffect(() => {
    const savedBooks = Auth.getSavedBookIds();
    if (savedBooks) {
      setSavedBookIds(savedBooks);
    }
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Implement your logic to fetch books from Google Books API here.
    // Update `searchedBooks` state with the fetched books.
  };

  const handleSaveBook = async (bookId) => {
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

    if (!bookToSave) return;

    try {
      const { data } = await saveBook({
        variables: { bookData: bookToSave },
      });

      setSavedBookIds([...savedBookIds, bookToSave.bookId]);
      Auth.saveBookIds(savedBookIds);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Container fluid className="py-4 text-light bg-dark">
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
      </Container>

      <Container>
        <h2>
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : "Search for a book to begin"}
        </h2>
        <Row>
          {searchedBooks.map((book) => (
            <Col md="4" key={book.bookId}>
              <Card
                className="mb-3"
                style={{ height: "400px", overflowY: "auto" }}
              >
                {book.image ? (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedBookIds?.some((id) => id === book.bookId)}
                      className="btn-block btn-info"
                      onClick={() => handleSaveBook(book.bookId)}
                    >
                      {savedBookIds?.some((id) => id === book.bookId)
                        ? "Book Saved"
                        : "Save this Book!"}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SearchBooks;
