import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { useRouteData } from "remix";
import { countByteSize } from "../../model/bytes";
import { HTML, processHTML } from "../../model/rendering";
import { Await } from "../../types/helpers";
import { CodeBlock } from "../../view/code";
import { NamedSection } from "../../view/semantics";
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

function* HTMLComponent() {
  yield HTML`<h1>Hello!</h1>`;
  yield HTML`<ul>`;
  yield HTML`<li>Some`;
  yield HTML`<li>list`;
  yield HTML`<li>items`;
  yield HTML`</ul>`;
}

export async function loader(args: Parameters<LoaderFunction>[0]) {
  return {
    functionsSource: {
      HTMLComponent: HTMLComponent.toString(),
    },
  };
}

export default function MakeRenderer() {
  let data: Await<ReturnType<typeof loader>> = useRouteData();

  const htmlOutput = Array.from(processHTML(HTMLComponent)).join("");

  return (
    <main data-measure="center">
      <h1>{"HTML Renderer"}</h1>

      <NamedSection id="example-1" heading={<h2>HTML Component</h2>}>
        <h3>Component Source</h3>
        <CodeBlock language="javascript">
          {data.functionsSource.HTMLComponent}
        </CodeBlock>
        <h3>HTML Output</h3>
        <p>{countByteSize(htmlOutput)} bytes</p>
        <div {...X(2)}>
          <CodeBlock language="html">{htmlOutput}</CodeBlock>
          <output
            data-x="grow"
            style={{ border: "1px solid black", padding: "1rem" }}
          >
            <div dangerouslySetInnerHTML={{ __html: htmlOutput }}></div>
          </output>
        </div>
      </NamedSection>

      <NamedSection id="source-html-producer" heading={<h2>HTML Processor</h2>}>
        <CodeBlock language="javascript">{processHTML.toString()}</CodeBlock>
      </NamedSection>
    </main>
  );
}
