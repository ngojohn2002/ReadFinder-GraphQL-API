import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { REMOVE_BOOK } from "../utils/mutations";
import Auth from "../utils/auth";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

const SavedBooks = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removeBook] = useMutation(REMOVE_BOOK, {
    refetchQueries: [{ query: QUERY_ME }],
  });

  const userData = data?.me || {};
  const [savedBookIds, setSavedBookIds] = useState([]);

  useEffect(() => {
    const savedBooks = Auth.getSavedBookIds();
    if (savedBooks) {
      setSavedBookIds(savedBooks);
    }
  }, [data]);

  const handleRemoveBook = async (bookId) => {
    try {
      await removeBook({
        variables: { bookId },
      });

      const updatedSavedBookIds = savedBookIds.filter(
        (savedBookId) => savedBookId !== bookId
      );
      setSavedBookIds(updatedSavedBookIds);
      Auth.saveBookIds(updatedSavedBookIds);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Container>
        <h2>
          {userData.savedBooks?.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? "book" : "books"
              }:`
            : "You have no saved books!"}
        </h2>
        <Row>
          {userData.savedBooks?.map((book) => (
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
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleRemoveBook(book.bookId)}
                  >
                    Remove this Book!
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
