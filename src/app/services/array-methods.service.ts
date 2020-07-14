import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
export const BINARY_SEARCH_END_POINT = 'https://localhost:5001/dotnetarray/findArray/binarysearch/';
export const GET_ARRAY_FROM_SERVER = 'https://localhost:5001/dotnetarray/generateArray/';
export interface BinarySearchResult {
  visitedIndex: number[];
  Found: boolean;
}
export interface BinarySearchQuery
{
    Array: number[];
    SearchKey: number;
}
@Injectable({
  providedIn: 'root'
})
export class ArrayMethodsService {
  constructor(private http: HttpClient) { }

  public getBinarySearchResult(query: BinarySearchQuery) {
    return this.http.post<BinarySearchResult>(BINARY_SEARCH_END_POINT, query);
  }

  public getArrayFromServer() {
    return this.http.get<number[]>(GET_ARRAY_FROM_SERVER);
  }
}
