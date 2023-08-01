import variables from "@/styles/variables.module.scss";

const Navbar = () => {
  return (
    <div className="navbar" style={{ backgroundColor: variables.primaryColor }}>
      <h3 style={{ color: variables.secondaryColor }}>
        Too <span className="green">Doo</span>
      </h3>
    </div>
  );
};

export default Navbar;
