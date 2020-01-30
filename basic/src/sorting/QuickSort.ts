/**
 * Worst-case time complexity O(n^2) when it is already sorted.
 * Best-case time complexity Ω(nlgn) when it is always partitioned by two arrays with same size.
 * Average time complexity Θ(nlgn)
 *
 * Space complexity is O(lgn) because of recursion stack.
 */
import { Sortable, compare } from '../comparable/Comparable';
import { swap } from '../utils/ArrayUtils';


function partition(a: Sortable[], left: number, right: number): number {
  const pivot = a[left];
  let l = left;
  let r = right;
  while (l < r) {
    do {
      l += 1;
    } while (compare(pivot, a[l]) >= 0);

    do {
      r -= 1;
    } while (compare(a[r], pivot) > 0);
    if (l < r) {
      swap(a, l, r);
    }
  }

  swap(a, r, left);
  return r;
}

function quickSortRecurse(a: Sortable[], left: number, right: number): void{
  if (right - left > 1) {
    const p = partition(a, left, right);
    quickSortRecurse(a, left, p);
    quickSortRecurse(a, p + 1, right);
  }
}

export default function quickSort(a: Sortable[]): void{
  if (a == null || a.length < 2) return;
  quickSortRecurse(a, 0, a.length);
}
