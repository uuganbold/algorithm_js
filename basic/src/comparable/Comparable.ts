export interface Comparable {
  compare(other: Comparable): number;
}

export type Sortable=Comparable|number|string;

export function compare(a: Sortable, b: Sortable): number {
  if (typeof a === 'number' || typeof a === 'string') {
    if (a > b) return 1;
    if (a === b) return 0;
    return -1;
  }
  return a.compare(b as Comparable);
}

export function isSortable(object:any):object is Sortable{
    if(typeof object==='number' || typeof object==='string'){
      return true;
    }
    return 'compare' in object;
}
