// Typescript fix import for prop-types ReactPropTypesSecret
declare module 'prop-types/lib/ReactPropTypesSecret' {
  export const PropTypesSecret: string;
}

// Typescript fix import for Sass
declare module '*.scss' {
  const content: {[className: string]: string};
  export = content;
}

// Typescript fix flat, flatMap
interface Array<T> {
  flat(): Array<T>;
  flatMap(func: (x: T) => any): Array<T>;
}
