import React from "react";
import Logo from '../assets/logo_white.png';

const Footer = () => {
  return (
    <div className="bg-base-200">
      <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10 container mx-auto">
        <aside>
          <img src={Logo} alt="" />
          <p>
            Dumbell Don Ltd.
            <br />
            Providing reliable GYM services since 1992
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Gym Equipment</a>
          <a className="link link-hover">Fitness Accessories</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
