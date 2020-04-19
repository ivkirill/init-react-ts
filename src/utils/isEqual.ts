export function isEqualObjects(a: Object, b: Object): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}
