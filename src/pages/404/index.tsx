import React from "react";
import styles from "./styles.module.scss";

export const NotFound: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>404</h1>
      <p className={styles.message}>Oops! The page you're looking for doesn't exist.</p>
      <a href="/" className={styles.link}>Go Back to Home</a>
    </div>
  );
};
