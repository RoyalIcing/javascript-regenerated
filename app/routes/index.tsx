import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { Link } from "remix";
import { useRouteData } from "remix";
import { PrimaryNavigation } from "../navs/primary";

import stylesUrl from "../styles/index.css";

export let meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!"
  };
};

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export let loader: LoaderFunction = async () => {
  return {};
};

export default function Index() {
  return (
    <main data-measure="center" data-text="center">
      <h1>JavaScript Regenerated</h1>
      <PrimaryNavigation />
    </main>
  );
}
