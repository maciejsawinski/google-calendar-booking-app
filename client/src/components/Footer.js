import React from "react";

function Footer() {
  return (
    <footer className="footer bg-dark text-white">
      <div className="container text-center">
        developed by{" "}
        <a
          className="badge badge-warning"
          href="https://github.com/maciejsawinski"
          target="_blank"
          rel="noopener noreferrer"
        >
          Maciej Sawiński
        </a>
      </div>
    </footer>
  );
}

export default Footer;
