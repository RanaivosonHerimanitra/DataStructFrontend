import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
export const BINARY_SEARCH_END_POINT = 'https://localhost:5001/dotnetarray/findArray/binarysearch/';
export interface BinarySearchResult {
  VisitedIndex: number[];
  Found: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class ArrayMethodsService {

  constructor(private http: HttpClient) { }
  public getBinarySearchResult() {
    return this.http.get<BinarySearchResult>(BINARY_SEARCH_END_POINT);
  }
}
