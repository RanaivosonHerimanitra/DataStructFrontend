import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as d3 from 'd3';
import { ArrayMethodsService, BinarySearchResult, BinarySearchQuery } from '../../services/array-methods.service';
import { Observable } from 'rxjs';

export const NUMBER_MUST_EXIST = 'Number must exist';
export const VALUE_IS_FOUND = 'Value has been found';
export const YOU_MUST_FILL_ARRAY = 'You must fill array using the Fill button';

export interface circleData {
  x_axis: number;
  y_axis: number;
  radius: number;
  color: string;
  textIndex: number;
};

export const LIST_OF_DOM_IDS: string[] = ['#arrayMethodVisual-col1', '#arrayMethodVisual-col2', '#arrayMethodVisual-col3'];

@Component({
  selector: 'app-array-methods',
  templateUrl: './array-methods.component.html',
  styleUrls: ['./array-methods.component.css']
})

export class ArrayMethodsComponent implements OnInit {
  public searchKey: number;
  public binarySearchResult$: Observable<BinarySearchResult>;
  public currentIndex: number = 0;
  private instanceArray: number[] = [];
  private query: BinarySearchQuery = {Array: [], SearchKey: -1};
  constructor(private _snackBar: MatSnackBar, private arrayMethodsService: ArrayMethodsService) {
  }

  ngOnInit(): void {
    this.initializeVisual();
  }

  private initializeVisual() {
    LIST_OF_DOM_IDS.forEach((Id: string, index: number) => {
      this.createVisual(Id, index * 50);
    });
  }

  private createVisual(Id: string, index: number) {
    const svg: any = d3.select(Id).append('svg').attr('width', 300).attr('height', 450);
    const jsonCircles: circleData[] = [
      { x_axis: 50 + index, y_axis: 400, radius: 20, color : '#69a3b2', textIndex: 5},
      { x_axis: 50 + index, y_axis: 350, radius: 20, color : '#69a3b2', textIndex: 4},
      { x_axis: 50 + index, y_axis: 300, radius: 20, color : '#69a3b2', textIndex: 3},
      { x_axis: 50 + index, y_axis: 250, radius: 20, color : '#69a3b2' , textIndex: 2},
      { x_axis: 50 + index, y_axis: 200, radius: 20, color : '#69a3b2', textIndex: 1},
      { x_axis: 50 + index, y_axis: 150, radius: 20, color : '#69a3b2', textIndex: 0}
    ];
    if (index/50 === 1) {
      let k: number = 12;
      jsonCircles.forEach((element: circleData) => {
        element.textIndex = k;
        k -= 1;
      });
    }
    if (index/50 === 2) {
      let k: number = 18;
      jsonCircles.forEach((element: circleData) => {
        element.textIndex = k;
        k -= 1;
      });
  }
    const circles = svg.selectAll('circle')
                            .data(jsonCircles)
                            .enter()
                            .append('circle');
    const circleAttributes = circles
                        .attr('id', (d: circleData) => `circle${d.textIndex}`)
                        .attr('cx', (d: circleData) => d.x_axis)
                        .attr('cy', (d: circleData) => d.y_axis)
                        .attr('r',  (d: circleData) => d.radius)
                        .style('fill', (d: circleData) => d.color);
    const text = svg.selectAll('text')
                         .data(jsonCircles)
                         .enter()
                         .append('text');
    const textLabels = text
                  .attr('x', (d: circleData) => { return d.x_axis-5; })
                  .attr('y', (d: circleData) => { return d.y_axis-5; })
                  .text((d: circleData) => { return d.textIndex; })
                  .attr('font-family', 'sans-serif')
                  .attr('font-size', '11.5px')
                  .attr('font-weight', 'bold')
                  .attr('fill', 'black');
  }

  public newArray(): void {
    d3.selectAll('svg').remove();
    this.initializeVisual();
  }

  public insertArray(): boolean {
    if (this.messageOnError()) return false;
    return true;
  }

  public fillArray(): void {
    this.arrayMethodsService.getArrayFromServer()
    .subscribe((data: any) => {
      this.instanceArray = data.values;
      for (let k = 0; k < this.instanceArray.length; k++) {
        const selectedNode = d3.selectAll('text').filter((data: circleData) => data.textIndex === k);
        if (selectedNode) selectedNode.text(`<${k}:${this.instanceArray[k]}>`).attr('x', (d: circleData) => { return d.x_axis-7; }).attr('y', (d: circleData) => { return d.y_axis-7; });
      }
    });
  }

  public bindSearchKey(event: any) {
    this.searchKey = event.target.value;
  }

  // will depend on some form choices (binary or linear)
  public findArray() {
    // empeach find if array has not been populated:
    if (this.messageOnEmptyArray()) return;
    if (this.messageOnError()) return;
    this.query.Array = this.instanceArray;
    this.query.SearchKey = Number(this.searchKey);
    this.binarySearchResult$ = this.arrayMethodsService.getBinarySearchResult(this.query);
    this.binarySearchResult$.subscribe((data: BinarySearchResult) => {
      const id = data.visitedIndex[this.currentIndex];
      if (id) {
        d3.select(`#circle${id}`).style('fill', '#800080');
        if (this.query.SearchKey === this.query.Array[id]) this.messageOnFoundNumber();
      }
      for (let k = 0; k < data.visitedIndex.length; k++) {
        if (k !== id)  d3.select(`#circle${k}`).style('fill', '#69a3b2');
      }
      this.currentIndex += 1;
    });
  }

  public deleteArray(): boolean {
    if (this.messageOnError()) return false;
    const chosenCircleId = Math.floor(Math.random() * 19);
    d3.select(`#circle${chosenCircleId}`).style('fill', 'grey');
    const selectedNode = d3.selectAll('text').filter((data: circleData) => data.textIndex === chosenCircleId);
    if (selectedNode) selectedNode.text('--');
    return true;
  }

  // may be move to a service all kind of errors:
  private messageOnError(): boolean {
    if(!this.searchKey) {
      this._snackBar.open(NUMBER_MUST_EXIST, '', {
        duration: 2000,
      });
      return true;
    }
    return false;
  }

  private messageOnEmptyArray(): boolean {
    if(this.instanceArray.length === 0) {
      this._snackBar.open(YOU_MUST_FILL_ARRAY, '', {
        duration: 2000,
      });
      return true;
    }
    return false;
  }

  private messageOnFoundNumber(): void {
    this._snackBar.open(VALUE_IS_FOUND, '', {
      duration: 2500,
    });
    return;
  }
}
