import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

const FooterLinks = [
  {
    title: "Home",
  },
  {
    title: "About",
  },
  {
    title: "Products",
  },
];

const Footer = () => {
  return (
    <div className="text-white bg-black px-20 py-10 max-md:text-sm">
      <div
        className="grid grid-cols-1 md:grid-cols-3  gap-20 
        sm:grid-cols-2   lg:grid-cols-3  border-b border-b-amber-600"
      >
        {/* company details */}
        <div>
          <h1 className="text-4xl pb-8">
            <span className="text-yellow-600 ">E</span>Shop
          </h1>
          <p className="text-gray-300 md:mb-9">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate
            quibusdam tempore ratione quisquam officia quidem obcaecati suscipit
            labore deserunt natus magnam minima asperiores atque molestiae autem
            itaque, laborum fuga assumenda.
          </p>
        </div>

        {/* Footer links */}

        {/* <div className="mt-9 grid grid-cols-2"> */}

        <div className=" px-4">
          <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify pb-8">
            Important links
          </h1>
          <ul>
            {FooterLinks.map((link) => (
              <li
                key={link.title}
                className="cursor-pointer hover:text-yellow-600 hover:translate-y-1 duration-300 text-gray-300 pb-5"
              >
                <span>{link.title}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* social links */}

        <div className=" grid grid-col-3">
          <h1 className=" sm:text-3xl  text-xl font-bold sm:text-left text-justify pb-8">
            Social links
          </h1>
          <div className="flex  gap-4">
            <a href="#" className="w-10 h-56 ">
              <FaInstagram size={30} />
            </a>
            <a href="#">
              <FaFacebook size={30} />
            </a>
            <a href="#">
              <FaLinkedin size={30} />
            </a>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Footer;
