import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "../../containers/footer/Footer";
import { useParams } from "react-router-dom";

interface BookDetails {
  description?: "string" | { value?: "string" };
  subject?: "string";
}

const BookDetails = () => {
  const { id } = useParams();
  const [, setError] = useState();
  const [selectedBook, setSelectedBook] = useState<BookDetails | null>(null); // help

  useEffect(() => {
    axios
      .get(`https://openlibrary.org/works/${id}.json`)
      .then((res) => setSelectedBook(res.data)) // why using data here?
      .catch((err) => setError(err.message));
  });

  return (
    <>
      {/* Description de l'element selectionne */}
      {selectedBook && (
        <div>
          <h2>Book details</h2>
          <p>
            <strong>Description:</strong> {""}
            {typeof selectedBook.description === "string"
              ? selectedBook.description
              : selectedBook.description?.value || "No available"}
          </p>
          {selectedBook.subject && (
            <p>
              <strong> Subject: </strong>
              {selectedBook.subject}
            </p>
          )}
        </div>
      )}
      <Footer />
    </>
  );
};

export default BookDetails;
