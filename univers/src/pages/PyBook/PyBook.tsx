import { useEffect, useState } from "react";
import Footer from "../../containers/footer/Footer";

const API_URL = `https://openlibrary.org/search.json?q=python`;

interface Books {
  key: string;
  title?: string;
  author_name?: string;
  cover_i?: string;
}

const PyBook = () => {
  // fetch sates
  const [isloading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [books, setBook] = useState<Books[]>([]);

  // fetching data with fetch method for javascript book

  useEffect(() => {
    const bookFetch = async () => {
      setLoading(true);

      try {
        const response = await fetch(`${API_URL}`);
        const data = (await response.json()) as Books[];
        setBook(data.docs);
        console.log(data);
      } catch (e: any) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    bookFetch();
  }, []);

  return (
    <>
      {error && (
        <p className="text-red-600 text-2xl text-center mt-[10rem]">
          Something went wrong! please try again or refresh a page.
        </p>
      )}

      <h1 className="text-5xl text-center py-15 text-yellow-600">
        Python products with fetch
      </h1>

      {isloading && (
        <p className="text-center mt-8 text-6xl text-yellow-600">Loading...</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-8 p-10">
        {books.slice(0, 12).map((book) => (
          <div
            key={book.key}
            className="shadow-md rounded-b-md bg-amber-50/50 p-8"
          >
            <h1 className="text-2xl text-yellow-800 pb-4">{book.title}</h1>
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

export default PyBook;
