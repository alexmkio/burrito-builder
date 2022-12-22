import "./Header.scss";
import reactLogo from "../../assets/react.svg";

function Header() {
  return (
    <header>
      <img src={reactLogo} className="logo" alt="React logo" />
      <h1>Burrito Builder</h1>
    </header>
  );
}

export default Header;
