import React from "react";
//imports corresponding css styling file
import "../../styles/footer.css";

//function to render the universal footer of the application
function Footer() {
  return (
    <footer className="footer">
      <div>
        <h5 className="created">Created By:</h5>
      </div>
      <div className="footer-names">
        <div className="footer-name">
          <a
            href="https://github.com/phadeline"
            target="_blank"
            rel="noreferrer"
          >
            <p className="name">
              Phadeline Evra
              <img
                className="githubimage"
                alt="github logo"
                src="https://img.icons8.com/3d-fluency/94/null/github.png"
              />
            </p>
          </a>
        </div>
        <div className="footer-name">
          <a
            href="https://github.com/briannalbo"
            target="_blank"
            rel="noreferrer"
          >
            <p>
              Brianna Alborano
              <img
                className="githubimage"
                alt="github logo"
                src="https://img.icons8.com/3d-fluency/94/null/github.png"
              />
            </p>
          </a>
        </div>
        <div className="footer-name">
          <a
            href="https://github.com/HumzaShaukat"
            target="_blank"
            rel="noreferrer"
          >
            <p>
              Humza Shaukat
              <img
                className="githubimage"
                alt="github logo"
                src="https://img.icons8.com/3d-fluency/94/null/github.png"
              />
            </p>
          </a>
        </div>
        <div className="footer-name">
          <a
            href="https://github.com/courtneysacco"
            target="_blank"
            rel="noreferrer"
          >
            <p>
              Courtney Sacco
              <img
                className="githubimage"
                alt="github logo"
                src="https://img.icons8.com/3d-fluency/94/null/github.png"
              />
            </p>
          </a>
        </div>
      </div>
    </footer>
  );
}
//exports footer
export default Footer;
