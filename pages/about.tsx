import Router from "next/router";

import { MainLayout } from "../view/layouts/MainLayout";

export default function About() {
  function linkClickHandler() {
    Router.push("/");
  }
  return (
    <MainLayout title="About">
      <h1>About</h1>
      <button onClick={linkClickHandler}>To Home</button>
    </MainLayout>
  );
}
