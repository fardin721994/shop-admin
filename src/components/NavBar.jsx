import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

const tabs = [
  { title: "صفحه اصلی", to: "" },
  { title: "محصولات", to: "products" },
  { title: "سبد خرید", to: "cart" },

  // { title: "درباره آزمون", to: "about-test" },
  // { title: "درباره ما", to: "about-us" },
];
function NavBar(props) {
  const [selectedTab, setSelectedTab] = useState("صفحه اصلی");
  const [showNav, setShowNav] = useState(false);

  const toggleShowNav = () => setShowNav((previousShowNav) => !previousShowNav);
  return (
    <div className="NavBar">
      <button className="menu-button" onClick={toggleShowNav}></button>
      <nav className={showNav ? "" : "hidden"} id="nav">
        <ul>
          {tabs.map(({ title, to }) => (
            <li key={title}>
              <NavLink to={to}>{title}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <NavLink
        to=""
        className="logo"
        onClick={() => setShowNav(false)}
      ></NavLink>
    </div>
  );
}

export default NavBar;
