import cn from "classnames";
import styles from "./styles.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}

export const Button = ({ children, className, ...args }: ButtonProps) => {
  return (
    <button
      aria-label={children}
      {...args}
      className={cn(styles.button, className)}
    >
      {children}
    </button>
  );
};