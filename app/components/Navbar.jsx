import Link from "next/link";

const Navbar = () => {
  return (
    <div className="navbar">
      <h3>
        <Link href="/" className="link">
          Too <span>Doo</span>
        </Link>

        <nav className="nav-link">
          <Link href="/login">Login</Link>
          <Link href="/signup">Sign Up</Link>
        </nav>
      </h3>
    </div>
  );
};

export default Navbar;
