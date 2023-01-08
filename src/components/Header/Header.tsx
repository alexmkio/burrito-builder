import "./Header.scss";
import reactLogo from "../../assets/react.svg";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Header() {
  let path = useLocation().pathname;

  return (
    <header>
      <img src={reactLogo} className="logo" alt="React logo" />
      <h1>Burrito Builder</h1>
      <nav>
        {path === "/" ? (
          <Link to="orders/">Orders</Link>
        ) : path === "/orders/" ? (
          <Link to="/">Home</Link>
        ) : (
          <>
            <Link to="/">Home</Link>
            <Link to="orders/">Orders</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
