import { Sortable, compare } from '../comparable/Comparable';


/**
 * Time Complexity O(n^2) because of it double loop
 * Space Complexity O(1)
 * @param a
 */
export default function insertionSort(a: Sortable[]):void {
  if (a == null || a.length < 2) return;
  for (let i = 1; i < a.length; i+=1) {
    const temp = a[i];
    let j = i - 1;
    while (j >= 0 && compare(a[j], temp) > 0) {
      a[j + 1] = a[j];
      j -= 1;
    }
    a[j + 1] = temp;
  }
}
