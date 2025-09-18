import { useEffect, useState } from "react";
import Footer from "../../containers/footer/Footer";
import axios from "axios";

const API_URL = `https://openlibrary.org/search.json?q=python`;

export interface Books {
  key: string;
  title?: string;
  author_name?: string;
  cover_i?: string;
}

const ProductPage = () => {
  // axios states
  const [error, setErr] = useState();
  const [isloading, setloading] = useState(true);
  const [PyBook, setPyBook] = useState<Books[]>([]);

  // fetching data with Axios method for python book

  useEffect(() => {
    axios
      .get(`${API_URL}`)
      .then((res) => setPyBook(res.data.docs))
      .catch((err) => setErr(err.message))
      .finally(() => setloading(false));
  }, []);

  // https://openlibrary.org/works/${id}.json

  return (
    <>
      {error && (
        <p className="text-red-600 text-2xl text-center mt-[10rem]">
          Something went wrong! please try again or refresh a page.
        </p>
      )}

      <h1 className="text-5xl text-center py-15 text-yellow-600">
        Python products with axios
      </h1>

      {isloading && (
        <p className="text-center mt-8 text-6xl text-yellow-600">Loading...</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-8 p-10">
        {PyBook.slice(0, 12).map((book) => (
          <div
            key={book.key}
            className="shadow-md rounded-b-md bg-amber-50/50 p-8"
          >
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://openlibrary.org/${book.key}.json`}
              className="text-2xl text-yellow-800 pb-4"
            >
              {book.title}
            </a>
            <img
              className="w-[4rem]"
              src={
                book.cover_i
                  ? `https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`
                  : "https://via.placeholder.com/50x70?text=No+cover"
              }
              alt={book.title}
            />
            <h2 className="text-xl font-black pt-8">{book.author_name}</h2>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
