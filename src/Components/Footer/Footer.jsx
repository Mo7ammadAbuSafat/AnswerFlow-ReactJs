import React from "react";
import styles from "./Footer.module.css";

function Footer(props) {
  const menu = [
    [
      "Categories",
      ["About us", "Questions", "Contact", "Say anything for us", "Privacy Policy"],
    ],
    [
      "Contact us",
      ["Palestine Technical University - Kadoorie,", "Tulkarm", "+970 598157962"],
    ],
  ];
  const list = menu.map((item) => {
    return (
      <>
        <ul>
          <li className={styles.ulTitle}>{item[0]}</li>
          {item[1].map((item) => {
            return <li>{item}</li>;
          })}
        </ul>
      </>
    );
  });
  return (
    <div className={styles.Footer}>
      <div className={styles.FooterMenu}>
        {list}
        <div className={styles.rightFooter}>
          <div className={styles.subscribe}>Subscribe to newsletter</div>
          <div className={styles.inputFooter}>
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>

      <div className={styles.Copyright}>© Copyright Mohammad AbuSafat</div>
    </div>
  );
}

export default Footer;