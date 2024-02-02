import styles from "./page.module.css";

export const Gradient = ({
  conic,
  className,
  small,
}: {
  small?: boolean;
  conic?: boolean;
  className?: string;
}): JSX.Element => {
  return (
    <div
      className={`${styles.gradient} ${small ? styles.small : ""} ${
        conic ? styles.conic : ""
      } ${className}`}
    />
  );
};
