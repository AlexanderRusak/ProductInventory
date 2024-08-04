import styles from "./styles.module.scss";

type SubmitErrorProps = {
  children?: string | null;
}

export const SubmitError = ({ children }: SubmitErrorProps) => {
  if (!children) {
    return null;
  }
  return (
    <div className={styles.error}>
      {children}
    </div>
  );
};