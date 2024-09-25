import { Link } from 'react-router-dom'
import React, { useState, useRef, useEffect } from 'react';
import './Header.css'; // Make sure to create and import a CSS file for styling


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const wrapperRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsMenuOpen(false)
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(wrapperRef)

  return (
    <header className="section page-header" ref={wrapperRef}>
      <div className="rd-navbar-wrap rd-navbar-corporate">
        <nav className="rd-navbar rd-navbar-original rd-navbar-static">
          <div className="rd-navbar-collapse-toggle" onClick={toggleMenu}>
            <span className="hamburger-icon"></span>
          </div>
          <div className={`rd-navbar-top-panel rd-navbar-collapse ${isMenuOpen ? 'open' : ''}`}>
            <div className="rd-navbar-top-panel-inner">
              <ul className="list-inline">
                <li className="box-inline list-inline-item">
                  <span className="icon novi-icon icon-md-smaller icon-secondary mdi mdi-phone"></span>
                  <ul className="list-comma">
                    <li><a href="tel:#">+84 379559559</a></li>
                  </ul>
                </li>
                <li className="box-inline list-inline-item">
                  <span className="icon novi-icon icon-md-smaller icon-secondary mdi mdi-map-marker"></span>
                  <a href="#">60 Liên Khu 10-11, Bình Trị Đông, Bình Tân, TP. Hồ Chí Minh</a>
                </li>
                <li className="box-inline list-inline-item">
                  <span className="icon novi-icon icon-md-smaller icon-secondary mdi mdi-email"></span>
                  <a href="mailto:#">info@gongo.vn</a>
                </li>
              </ul>
              <ul className="list-inline">
                <li className="list-inline-item"><a className="icon novi-icon icon-sm-bigger icon-gray-1 mdi mdi-facebook" href="#"></a></li>
                <li className="list-inline-item"><a className="icon novi-icon icon-sm-bigger icon-gray-1 mdi mdi-twitter" href="#"></a></li>
                <li className="list-inline-item"><a className="icon novi-icon icon-sm-bigger icon-gray-1 mdi mdi-instagram" href="#"></a></li>
                <li className="list-inline-item"><a className="icon novi-icon icon-sm-bigger icon-gray-1 mdi mdi-google-plus" href="#"></a></li>
                <li className="list-inline-item"><a className="icon novi-icon icon-sm-bigger icon-gray-1 mdi mdi-linkedin" href="#"></a></li>
              </ul>
            </div>
            <div className="rd-navbar-top-panel-inner">
              <a className="button button-sm button-secondary button-nina" href="https://www.templatemonster.com/website-templates/62466.html" target="_blank" rel="noopener noreferrer">buy template now</a>
            </div>
          </div>
          <div className="rd-navbar-inner">
            <div className="rd-navbar-panel">
              <div className="rd-navbar-brand">
                <Link className='brand-name' to="/">
                  <img className="logo-default" src="logo.jpg" alt="" style={{ width: "80px", borderRadius: "60px" }} />
                  <img className="logo-inverse" src="images/logo-inverse-208x46.png" alt="" width="208" height="46" />
                </Link>
                <span className='company-name'>Gongo</span>
              </div>
              <button className="rd-navbar-toggle" onClick={toggleMenu}>
                <span className="hamburger-icon"></span>
              </button>
            </div>
            <div className={`rd-navbar-aside-center ${isMenuOpen ? 'open' : ''}`}>
              <div className="rd-navbar-nav-wrap">
                <ul className="rd-navbar-nav">
                  <li className="active"><Link to="/">Home</Link></li>
                  <li><a href="about-us.html">About Us</a></li>
                  <li><a href="contacts.html">Contacts</a></li>
                </ul>
              </div>
            </div>
            <div className={`rd-navbar-aside-right  ${isMenuOpen ? 'open' : ''}`}>
              <Link className='button button-sm button-secondary button-nina' to="/apply">Book a VISA now</Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;