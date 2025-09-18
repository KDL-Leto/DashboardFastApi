import shirt from "../../assets/images/shirt.jpg";
import man from "../../assets/images/man.jpg";
import blazer from "../../assets/images/blazer.jpg";
import pull from "../../assets/images/pull.jpg";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import SpinnerLoader from "../loading/SpinnerLoader";

const ProductData = [
  {
    id: 1,
    img: shirt,
    title: "Shirt",
    color: "red  brown white",
    rating: "6.7k",
  },
  {
    id: 2,
    img: man,
    title: "Man dresses",
    color: "blue  brown white black",
    rating: "2.5k",
  },
  {
    id: 3,
    img: pull,
    title: "Pull",
    color: "yellow  green white",
    rating: "5.2k",
  },
  {
    id: 4,
    img: blazer,
    title: "Blazer",
    color: "puple  brown black grey",
    rating: "5.4k",
  },
];

const ProductCart = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const load = setTimeout(() => {
      setShow(false);
    }, 4000);

    return () => clearTimeout(load);
  }, []);

  return (
    // title section

    <div className=" mt-14 mb-14">
      <div className="text-center  max-w-[600px] mx-auto">
        <p className="text-sm text-yellow-600  ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <h1 className="text-3xl text-gray-800 font-bold">
          {" "}
          Top Selling Products
        </h1>
        <p className="text-sm text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus,
          numquam.
        </p>
      </div>

      {/* cart */}

      <div>
        <div
          className="grid grid-cols-1 md:grid-cols-4 m-[5rem] gap-8 
        sm:grid-cols-3 place-items-center  lg:grid-cols-4 "
        >
          {/* Card section */}

          {ProductData.map((product) =>
            show ? (
              <SpinnerLoader />
            ) : (
              <div key={product.id} className="space-y-1.5">
                <img
                  src={product.img}
                  alt=""
                  className="h-[18rem] w-[15rem] object-cover rounded-sm"
                />
                <div>
                  <h3 className="font-semibold ">{product.title}</h3>
                </div>
                <div className="text-sm text-gray-600">
                  <p>{product.color}</p>
                </div>
                <div className="flex items-center gap-1">
                  <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                  <span>{product.rating}</span>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
