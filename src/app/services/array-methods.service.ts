import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
export const BINARY_SEARCH_END_POINT = 'https://localhost:5001/dotnetarray/findArray/binarysearch/';
export interface BinarySearchResult {
  VisitedIndex: number[];
  Found: boolean;
}
export interface BinarySearchQuery
{
    Array: number[];
    searchKey: number;
}
@Injectable({
  providedIn: 'root'
})
export class ArrayMethodsService {

  constructor(private http: HttpClient) { }
  public getBinarySearchResult(query: BinarySearchQuery) {
    return this.http.post<BinarySearchResult>(BINARY_SEARCH_END_POINT, query);
  }
}
