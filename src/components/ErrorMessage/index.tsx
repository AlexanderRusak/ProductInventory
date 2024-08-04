import styles from "./styles.module.scss";

interface ErrorMessageProps {
    message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return <div className={styles.ErrorMessage}>{message}</div>;
};
