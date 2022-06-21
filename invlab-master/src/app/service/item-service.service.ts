import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IItem {
    code: any;
    itemCode: any;
    itemCat: any;
    des: any;
    path:any;
    price:any;
}

@Injectable({
  providedIn: 'root'
})

export class ItemServiceService {

  constructor(private http: HttpClient) { }

  createItem(itm: IItem): Observable<any>{
   return this.http.post('http://localhost:3000/item', itm);
  }

  getItems(): Observable<any>{
    return this.http.get<any>('http://localhost:3000/item');
  }

  getItem(code): Observable<any>{
    return this.http.get<any>('http://localhost:3000/item/'+code);
  }

  updateItem(itm: IItem): Observable<IItem>{
    return this.http.put<IItem>('http://localhost:3000/item', itm);
  }

  deleteItem(code){
    return this.http.delete('http://localhost:3000/item/' + code);
  }

  getItem_byCategory(cat): Observable<any>{
    return this.http.get<any>('http://localhost:3000/item/cat/'+cat);
  }
}
