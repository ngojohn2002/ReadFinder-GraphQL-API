import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { REMOVE_BOOK } from "../utils/mutations";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import Auth from "../utils/auth";

const SavedBooks = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removeBook] = useMutation(REMOVE_BOOK);

  const userData = data?.me || {};

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  const handleRemoveBook = async (bookId) => {
    try {
      const { data } = await removeBook({
        variables: { bookId },
      });

      if (!data) {
        throw new Error("Something went wrong!");
      }

      alert("Book removed!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? "book" : "books"
              }:`
            : "You have no saved books!"}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => (
            <Col key={book.bookId} md={4}>
              <Card border="dark">
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
