import "./Header.scss";
import reactLogo from "../../assets/react.svg";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Header() {
  let path = useLocation().pathname;
  const homeLink = (
    <Link to="../" aria-label="Navigate to home page">
      Home
    </Link>
  );
  const ordersLink = (
    <Link to="../orders/" aria-label="Navigate to orders page">
      Orders
    </Link>
  );

  return (
    <header>
      <img src={reactLogo} className="logo" alt="React logo" />
      <h1>Burrito Builder</h1>
      <nav>
        {path === "/" ? (
          <>{ordersLink}</>
        ) : path === "/orders/" ? (
          <>{homeLink}</>
        ) : (
          <>
            {homeLink}
            {ordersLink}
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
