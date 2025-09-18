import { useEffect, useState } from "react";
import login_image from "../../assets/images/hero.png";
import ProductCart from "../../containers/Products";
import Footer from "../../containers/footer/Footer";
import SpinnerLoader from "../../containers/loading/SpinnerLoader";
import Subscribe from "../../containers/subscribe/Subscribe";

const HomePage = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const load = setTimeout(() => {
      setShow(false);
    }, 4000);

    return () => clearTimeout(load);
  }, []);

  return (
    <>
      {show ? (
        <SpinnerLoader />
      ) : (
        <div>
          <div
            className="px-9 bg-gray-100   flex justify-between items-center gap-22 w-full  
  max-md:flex-col max-md:gap-6"
          >
            <div>
              <img
                src={login_image}
                alt="hero-image"
                className="max-md:w-[22rem]"
              />
            </div>
            <div className=" ">
              <h1 className="text-7xl text-yellow-600 pb-8">
                Lorem ipsum dolor sit amet.
              </h1>
              <p className="text-2xl text-gray-950">
                Lorem ipsum dolor sit amet consectetur adipisicing e lit. Aut
                officia asperiores quaerat accusamus fugit in numquam ipsum,
                deleniti doloremque! Itaque amet quos
              </p>
            </div>
          </div>
          <ProductCart />
          <Subscribe />
          <Footer />
        </div>
      )}
    </>
  );
};

export default HomePage;
