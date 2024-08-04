import styles from "./styles.module.scss";

type PopupProps = {
  children: React.ReactNode,
  closePopup: () => void,
}

export const Popup = ({ children, closePopup }: PopupProps) => {

  return (
    <>
      <div className={styles.popup__overlay} />
      <div className={styles.popup}>
        <button
          className={styles.popup__close}
          onClick={closePopup}
        >x</button> {/* Todo import icon */}
        {children}
      </div>
    </>
  );
};