import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any, searchTerm: string) {
    if (!items || !searchTerm) {
      return items;
    }

    const indexSearch = [];
    for (let i of items) {
      if (i['UserName'].includes(searchTerm)) {
          indexSearch.push(i)
      }
    }
    return indexSearch;
  }
}
