import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '@interfaces/category.interface';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(categories: Category[], type: string): Category[] {
    return categories.filter((cat: Category) => cat.type === type);
  }

}
