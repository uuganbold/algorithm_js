export function swap(a: any[], i: number, j: number):void {
  const temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}
