// auth.js
class AuthService {
  // Other methods...

  getSavedBookIds() {
    return localStorage.getItem("saved_books")
      ? JSON.parse(localStorage.getItem("saved_books"))
      : [];
  }

  saveBookIds(bookIdArr) {
    if (bookIdArr.length) {
      localStorage.setItem("saved_books", JSON.stringify(bookIdArr));
    } else {
      localStorage.removeItem("saved_books");
    }
  }
}

export default new AuthService();
