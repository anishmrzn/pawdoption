import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/">
      <img
        src="/logo.png"
        alt="Pawdoption logo"
        className="ml-2  h-auto w-[20rem]"
        data-aos="fade-down"
      />
    </Link>
  );
}

export default Logo;
