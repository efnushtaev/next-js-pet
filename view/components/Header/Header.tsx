import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./styles.module.css";

export const Header = () => {
  const { asPath } = useRouter();

  return (
    <header>
      <nav>
        <div className={styles.navWrapper}>
          <Link href={"/"}>
            <a>ALL POSTS</a>
          </Link>
          <Link href={"/about"}>
            <a>ABOUT</a>
          </Link>
        </div>
      </nav>
      <div className={styles.titleWrapper}>
        <p className={asPath === "/" ? styles.title : styles.titleEmpty}>
          {asPath === "/" ? "LATEST ARTICLES" : ""}
        </p>
      </div>
    </header>
  );
};
