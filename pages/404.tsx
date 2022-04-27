import Link from "next/link";
import styles from './../styles/error.module.css'

export default function ErrorPage() {
  return (
    <>
      <h2 className={styles.error}>ERROR 404</h2>
      <p>
        Go{" "}
        <Link href={"/"}>
          <a>Back</a>
        </Link>
      </p>
    </>
  );
}
