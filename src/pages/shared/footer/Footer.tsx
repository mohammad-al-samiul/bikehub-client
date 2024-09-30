import { Box, Button, Link as A } from "@chakra-ui/react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const footerItems = [
    { label: "Home", path: "home" },
    { label: "Choose us", path: "choose-us" },
    { label: "How To Rent", path: "how-to-rent" },
    { label: "Bikes", path: "bikes" },
    { label: "Reviews", path: "reviews" },
  ];
  return (
    <footer className="footer w-full footer-center shadow-lg text-base-content rounded p-10">
      <nav className="lg:grid lg:grid-flow-col gap-4">
        {footerItems.map((item, i) => (
          <A key={i} href={window.location.origin + "/" + item.path}>
            <Button
              paddingStart={0}
              paddingEnd={0}
              className="group hover:text-teal-500 focus:text-teal-500"
              variant="nav"
              _hover={{ transition: "all 0.3s ease-in-out" }}
              pos={"relative"}
            >
              {item.label}
              <Box
                position={"absolute"}
                className="w-0 h-[2px] bg-teal-500 rounded-xl bottom-0 left-0"
                _groupFocus={{ width: "100%" }}
                _groupHover={{
                  width: "100%",
                  transition: "all 0.3s ease-in-out",
                }}
              />
            </Button>
          </A>
        ))}
      </nav>

      <nav>
        <div className="grid grid-flow-col gap-4 text-3xl">
          <a target="_blank" href="https://www.facebook.com/alsamiul1996">
            <FaFacebook className="text-4xl hover:text-teal-500 focus:text-teal-500 transform hover:scale-110 transition-transform duration-300" />
          </a>
          <a target="_blank" href="https://github.com/mohammad-al-samiul">
            <FaGithub className="text-4xl hover:text-teal-500 focus:text-teal-500 transform hover:scale-110 transition-transform duration-300" />
          </a>
          <a target="_blank" href="https://www.linkedin.com/in/al-samiul/">
            <FaLinkedin className="text-4xl hover:text-teal-500 focus:text-teal-500 transform hover:scale-110 transition-transform duration-300" />
          </a>
        </div>
      </nav>
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by ACME
          Industries Ltd
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
