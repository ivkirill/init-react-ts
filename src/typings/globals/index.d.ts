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
