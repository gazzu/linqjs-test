import { Enumerable } from 'linq';
import { ajax } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';


const obs$ = ajax.getJSON(`data.json`).pipe(
  map(data => console.log('cars: ', data.result)),
  catchError(error => console.log('error: ', error))
);