import Head from "next/head";

import { Header } from "../components/Header";

import styles from './styles.module.css'


export function MainLayout({ children, title }) {
  return (
    <div className={styles.mainWrapper}>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content="next js react" />
      </Head>
      <Header/>

      <main className={styles.postsWrapper}>{children}</main>
    </div>
  );
}
