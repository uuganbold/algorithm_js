import { Sortable, Comparable,compare } from '../comparable/Comparable';

function merge(list: Sortable[], start: number, divide: number, end: number): void{
  const left: Sortable[] = [];
  const right: Sortable[] = [];

  for (let i = start; i < divide; i++) left[i - start] = list[i];
  for (let i = divide; i < end; i++) right[i - divide] = list[i];

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
