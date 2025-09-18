import { useEffect, useState } from "react";
import Footer from "../../containers/footer/Footer";

type Book = {
  key: string;
  title?: string;
  author_name?: string;
  cover_i?: string;
};

const AboutPage = () => {
  const [books, setBook] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  // useEffect for fetching data from API
  useEffect(() => {
    setLoading(true);
    fetch(`https://openlibrary.org/search.json?q=javascript`)
      .then((res) => {
        console.log(res);
        if (!res.ok) throw new Error("failed to fetch data");
        return res.json();
      })
      .then((data) => setBook(data.docs))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="p-[4rem] text-center bg-amber-100 text-4xl sm:text-7xl  text-yellow-600 ">
        About page
      </h1>

      <div className="pt-[4rem] pb-[3rem] text-center bg-linear-to-b">
        <h2 className=" text-3xl sm:text-4xl ">Our javascript library</h2>
        <p className="text-gray-600">
          The most popular books in javascript and frameworks javascript
        </p>
      </div>

      {loading && (
        <p className="flex w-full h-screen pt-20 justify-center text-3xl text-yellow-600">
          loading...
        </p>
      )}
      {error && <p>{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-8 p-10">
        {!loading &&
          !error &&
          books.slice(0, 10).map((book) =>  // slice(0,10) permet de recuperer de 0 a 9 elemetn dans le fichier API vu qu'il yen a plus de 10 elements
        (
              <div
                key={book.key}
                className=" shadow-md rounded-b-md bg-amber-50/50 p-8"
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
                <p className="text-xl font-black">{book.author_name}</p>
              </div>
            )
          )}
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
