import {Injectable} from '@angular/core';
import {Item} from '../shared/item';
import {Observable} from 'rxjs';
import 'rxjs-compat/add/observable/of';
import 'rxjs-compat/add/operator/delay';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {baseURL} from '../shared/baseurl';
import {map} from 'rxjs/operators';
import { ItemInstanceState } from '../shared/item_instance_state';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) {
  }

  getItems(): Observable<Item[]> {
    // return Observable.of(ITEMS).delay(2000);
    return this.http.get(baseURL + 'iteminstances') as Observable<Item[]>;
  }

  getItem(id: number): Observable<Item> {
    return this.http.get(baseURL + 'iteminstances/' + id) as Observable<Item>;
  }

  getFeaturedItem(): Observable<Item> {
    return this.http.get(baseURL + 'iteminstances?featured=true').pipe(
      map(items => (items as Item[]).find(item => item.featured === true))) as Observable<Item>;
  }

  getItemIds(): Observable<number[]> {
    return this.http.get(baseURL + 'iteminstances').pipe(map(items => (items as Item[]).map(item => item.id))) as Observable<number[]>;
  }

  getItemInstanceStates(): Observable<ItemInstanceState[]> {
    return this.http.get(baseURL + 'iteminstancestates') as Observable<ItemInstanceState[]>;
  }

  updateItem(item: Item): Observable<Item> {
    return this.http.put(baseURL + 'iteminstances', item) as Observable<Item>;
  }

  uploadImage(file: File, id): Observable<any> {
    const url = `${baseURL}` + 'items/' + id + '/image';
    const formData: FormData = new FormData();
    const aux: File[] = [];
    aux.push(file);
    formData.append('file', file);
    const req = new HttpRequest('POST', url, formData, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }

  deleteImage(id): Observable<any> {
    const url = `${baseURL}` + 'item-image/' + id;
    return this.http.delete(url);
  }
}
