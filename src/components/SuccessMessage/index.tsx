import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

type SuccessMessageProps = {
    message: string;
};

export const SuccessMessage = ({ message }: SuccessMessageProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return null;
  }

  return <div className={styles.successMessage}>{message}</div>;
};
