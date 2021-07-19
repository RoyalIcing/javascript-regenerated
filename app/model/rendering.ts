export const identifiers = {
  html: "html",
  cssRule: "cssRule",
  cssClassName: "cssClassName",
  image: "image",
} as const;

export const out = {
  html: (raw: TemplateStringsArray) => ({
    type: identifiers.html,
    raw: raw.raw.join(""),
  }),
  css: (selector: string, rules: string) => ({
    type: identifiers.cssRule,
    selector,
    rules,
  }),
};

export type Token = ReturnType<typeof out.html | typeof out.css>;

export function* processHTML(generator: () => Generator<Token, void, void>) {
  const gen = generator();
  while (true) {
    const result = gen.next();
    if (result.done) break;

    if (result.value.type === identifiers.html) {
      yield result.value.raw;
      yield "\n";
    }
  }
}

export function* processCSS(generator: () => Generator<Token, void, void>) {
  const gen = generator();
  while (true) {
    const result = gen.next();
    if (result.done) break;

    if (result.value.type === identifiers.cssRule) {
      yield result.value.selector.replace(/^/, "output ");
      yield " {";
      yield result.value.rules;
      yield "}";
      yield "\n";
    }
  }
}