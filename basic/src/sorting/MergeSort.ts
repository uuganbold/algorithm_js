/**
 *
 */
import { Sortable, compare } from '../comparable/Comparable';

/**
 * Time Complexity O(n) since need to loop n times to fill the array of size n;
 * Space Complexity O(n) since need to merge two arrays of size n/2 to fill the array of size n.
 * @param list
 * @param start
 * @param divide
 * @param end
 */
function merge(list: Sortable[], start: number, divide: number, end: number): void{
  const left: Sortable[] = [];
  const right: Sortable[] = [];

  for (let i = start; i < divide; i += 1) left[i - start] = list[i];
  for (let i = divide; i < end; i += 1) right[i - divide] = list[i];

  let l = 0; let r = 0; let
    i = start;
  while (l < left.length && r < right.length) {
    if (compare(left[l], right[r]) >= 0) {
      list[i] = right[r];
      r += 1;
    } else {
      list[i] = left[l];
      l += 1;
    }
    i += 1;
  }

  while (l < left.length) {
    list[i] = left[l];
    i += 1;
    l += 1;
  }

  while (r < right.length) {
    list[i] = right[r];
    i += 1;
    r += 1;
  }
}
/**
 * T(n)=2*T(n/2)+O(n). By master theorem, O(n)=n^log2=O(n)=> Time Complexity O(nlgn)
 * Space Complexity will be: O(n)+O(lgn)=O(n)
 * @param list
 * @param start
 * @param end
 */
function mergeSortRecurse(list: Sortable[], start: number, end: number): void{
  if (end - start > 1) {
    const divide = Math.floor((start + end) / 2);
    mergeSortRecurse(list, start, divide);
    mergeSortRecurse(list, divide, end);
    merge(list, start, divide, end);
  }
}

export default function mergeSort(list: Sortable[]): void{
  if (list == null) return;
  mergeSortRecurse(list, 0, list.length);
}
