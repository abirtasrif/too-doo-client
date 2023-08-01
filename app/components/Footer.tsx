import variables from "@/styles/variables.module.scss";

const Footer = () => {
  return (
    <div className="footer" style={{ backgroundColor: variables.primaryColor }}>
      <h3 style={{ color: variables.secondaryColor }}>
        Copyright {new Date().getFullYear()} &copy; Abir Tasrif Anto{" "}
      </h3>
    </div>
  );
};

export default Footer;
