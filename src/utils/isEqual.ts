export type IsEqualObjects = (a: Record<string, any>, b: Record<string, any>) => boolean;

export function isEqualObjects(a: Record<string, any>, b: Record<string, any>): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}
