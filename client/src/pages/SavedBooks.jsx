import React from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { REMOVE_BOOK } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";
import NoImagePlaceholder from "../assets/no-image.png"; // Add your placeholder image path

const SavedBooks = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removeBook] = useMutation(REMOVE_BOOK);

  const userData = data?.me || {};

  const handleRemoveBook = async (bookId) => {
    try {
      await removeBook({
        variables: { bookId },
        refetchQueries: [{ query: QUERY_ME }],
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Container className="my-4">
        <h1>Viewing saved books!</h1>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? "book" : "books"
              }:`
            : "You have no saved books!"}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => {
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
                    src={book.image || NoImagePlaceholder} // Use placeholder if no image
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
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleRemoveBook(book.bookId)}
                  >
                    Remove this Book!
                  </Button>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
