
import Header from '../Header';
import { Outlet, Link } from "react-router-dom";
const Layout = () => {
  return (
    <>
      <div className="App">
        <div className='page'>
          <Header />
          <Outlet />
          <footer className="section page-footer page-footer-minimal novi-background bg-cover text-center bg-gray-darker">
            <div className="container container-wide">
              <div className="row row-fix justify-content-sm-center align-items-md-center row-30">
                <div className="col-md-10 col-lg-7 col-xl-4 text-xl-left">
                  <Link to="/">
                    <img className="inverse-logo" src="logo.jpg" alt="" style={{width: "80px", borderRadius: "60px"}} width="208" height="46" />
                  </Link>
                </div>
                <div className="col-md-10 col-lg-7 col-xl-4">
                  <p className="right">©&nbsp;<span className="copyright-year">2024</span> All Rights Reserved. Design&nbsp;by&nbsp;<a href="https://www.templatemonster.com">Gongo Team</a></p>
                </div>
                <div className="col-md-10 col-lg-7 col-xl-4 text-xl-right">
                  <ul className="group-xs group-middle"> 
                    <li><a className="icon novi-icon icon-md-middle icon-circle icon-secondary-5-filled mdi mdi-facebook" href="#"></a></li>
                    <li><a className="icon novi-icon icon-md-middle icon-circle icon-secondary-5-filled mdi mdi-twitter" href="#"></a></li>
                    <li><a className="icon novi-icon icon-md-middle icon-circle icon-secondary-5-filled mdi mdi-instagram" href="#"></a></li>
                    <li><a className="icon novi-icon icon-md-middle icon-circle icon-secondary-5-filled mdi mdi-google" href="#"></a></li>
                    <li><a className="icon novi-icon icon-md-middle icon-circle icon-secondary-5-filled mdi mdi-linkedin" href="#"></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
};

export default Layout;