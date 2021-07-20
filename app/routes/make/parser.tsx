import React from "react";
import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { parseString } from "../../model/parsing";
import { X } from "../../view/structure";

export let meta: MetaFunction = () => {
  return {
    title: "Renderers: JavaScript Regenerated",
    description: "One components that renders to many targets",
  };
};

export let links: LinksFunction = () => {
  return [];
};

export let loader: LoaderFunction = async () => {
  return { message: "this is awesome 😎" };
};

interface AWSRegion {
  primary: string;
  secondary: string;
  digit: number;
}
function* ParseAWSRegion(): Generator<
  string | string[] | number[],
  AWSRegion,
  any
> {
  const primary = yield [
    "us-gov",
    "us",
    "af",
    "ap",
    "ca",
    "eu",
    "cn",
    "me",
    "sa",
  ];
  yield "-";
  const secondary = yield [
    "northeast",
    "northwest",
    "southeast",
    "central",
    "north",
    "east",
    "west",
    "south",
  ];
  yield "-";
  const digit = yield [1, 2, 3];

  return {
    primary,
    secondary,
    digit,
  };
}

function LabelledSection(props: {
  id: string;
  heading: JSX.Element;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <section id={props.id}>
      {React.cloneElement(props.heading, { "aria-labelledby": props.id })}
      {props.children}
    </section>
  );
}

export default function MakeRenderer() {
  function renderExample(input: string): JSX.Element {
    return (
      <div {...X(2)}>
        <p>{input}</p>
        <div>
          <pre>
            <code className="lang-json">
              {JSON.stringify(parseString(input, ParseAWSRegion), null, 2)}
            </code>
          </pre>
        </div>
      </div>
    );
  }

  return (
    <main data-measure="center">
      <h1>Parser</h1>
      <pre>
        <code className="lang-javascript">{parseString.toString()}</code>
      </pre>

      <LabelledSection
        id="aws-region-parser"
        heading={<h2>AWS Region Parser</h2>}
      >
        <pre>
          <code className="lang-javascript">{ParseAWSRegion.toString()}</code>
        </pre>

        <LabelledSection
          id="aws-region-parser-results"
          heading={<h3>Results</h3>}
        >
          {renderExample("us-west-1")}
          {renderExample("ap-southeast-2")}
          {renderExample("xx-east-1")}
          {renderExample("eu-west-3")}
          {renderExample("us-gov-west-1")}
        </LabelledSection>
      </LabelledSection>
    </main>
  );
}
