import { Sortable, compare } from '../comparable/Comparable';
import { swap } from '../utils/ArrayUtils';

function parent(i: number): number {
  return Math.floor((i - 1) / 2);
}

function left(i: number): number {
  return 2 * i + 1;
}

function right(i: number): number {
  return 2 * i + 2;
}

/**
 * On worst case T(n)=T(2n/3)+Θ(1). By master theorem, n^(log1)=n^0=1=Θ(1)=> Time Complexity=O(lgn)
 * Space complexity Θ(1)
 * @param a
 * @param i
 * @param heapSize
 */
function maxHeapify(a: Sortable[], i: number, heapSize: number): void{
  const l = left(i);
  const r = right(i);
  let largest = i;
  if (l < heapSize && compare(a[l], a[i]) > 0) {
    largest = l;
  }
  if (r < heapSize && compare(a[r], a[largest]) > 0) {
    largest = r;
  }
  if (largest !== i) {
    swap(a, i, largest);
    maxHeapify(a, largest, heapSize);
  }
}

/**
 * Time complexity O(n)
 * Because if height of tree is h time complexity to heapify will be O(h).
 * And total complexity will be n*Sum(h/2^h)=> O(n)
 * @param a
 */
function buildMaxHeap(a: Sortable[]): void{
  const start = parent(a.length - 1);
  for (let i = start; i >= 0; i -= 1) {
    maxHeapify(a, i, a.length);
  }
}

/**
 * Time complexity is O(nlogn) because each max_heapyfy run with O(lgn) and it runs (n-1) times.
 * Space complexity O(1) since it is in-place sort
 * @param a
 */
export default function heapSort(a: Sortable[]): void{
  if (a == null || a.length < 2) return;
  buildMaxHeap(a);
  for (let i = a.length - 1; i > 0; i -= 1) {
    swap(a, 0, i);
    maxHeapify(a, 0, i);
  }
}
