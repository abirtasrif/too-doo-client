import Link from "next/link";

const Navbar = () => {
  return (
    <div className="navbar">
      <h3>
        <Link href="/" className="link">
          Too <span>Doo</span>
        </Link>
      </h3>
    </div>
  );
};

export default Navbar;
