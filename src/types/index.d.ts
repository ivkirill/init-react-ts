// Typescript fix import for Sass
declare module '*.scss' {
  const content: {[className: string]: string};
  export = content;
}
