import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as d3 from "d3";
export interface circleData {
  x_axis: number;
  y_axis: number;
  radius: number;
  color: string;
  textIndex: number;
};
@Component({
  selector: 'app-array-methods',
  templateUrl: './array-methods.component.html',
  styleUrls: ['./array-methods.component.css']
})

export class ArrayMethodsComponent implements OnInit {
  public searchKey: number;
  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.initializeVisual();
  }

  public initializeVisual() {
    ['#arrayMethodVisual-col1', '#arrayMethodVisual-col2', '#arrayMethodVisual-col3'].forEach((Id:string, index: number) => {
      this.createVisual(Id, index*50);
    });
  }

  private createVisual(Id: string, index: number) {
    const svg: any = d3.select(Id).append("svg").attr("width", 300).attr("height", 450);
    const jsonCircles: circleData[] = [
    { x_axis: 50 + index, y_axis: 400, radius: 20, color : "#69a3b2", textIndex: 5},
    { x_axis: 50 + index, y_axis: 350, radius: 20, color : "#69a3b2", textIndex: 4},
    { x_axis: 50 + index, y_axis: 300, radius: 20, color : "#69a3b2", textIndex: 3},
    { x_axis: 50 + index, y_axis: 250, radius: 20, color : "#69a3b2" , textIndex: 2},
    { x_axis: 50 + index, y_axis: 200, radius: 20, color : "#69a3b2", textIndex: 1},
    { x_axis: 50 + index, y_axis: 150, radius: 20, color : "#69a3b2", textIndex: 0}
  ];
  if (index/50 === 1) {
    let k: number = 12
    jsonCircles.forEach((element:circleData) => {
      element.textIndex =k;
      k -=1;
    });
  }
  if (index/50 === 2) {
    let k: number = 18
    jsonCircles.forEach((element:circleData) => {
      element.textIndex =k;
      k -=1;
    });
  }
  const circles = svg.selectAll("circle")
                            .data(jsonCircles)
                            .enter()
                            .append("circle");
  const circleAttributes = circles
                        .attr("id", (d:circleData) => { return `circle${d.textIndex}`; })
                        .attr("cx", (d: circleData) => { return d.x_axis; })
                        .attr("cy", (d:circleData) => { return d.y_axis; })
                        .attr("r",  (d:circleData) => { return d.radius; })
                        .style("fill", (d:circleData) => { return d.color; });
  const text = svg.selectAll("text")
                         .data(jsonCircles)
                         .enter()
                         .append("text");
  const textLabels = text
                  .attr("x", (d:circleData) => { return d.x_axis; })
                  .attr("y", (d:circleData) => { return d.y_axis; })
                  .text((d:circleData) => { return d.textIndex; })
                  .attr("font-family", "sans-serif")
                  .attr("font-size", "15px")
                  .attr("fill", "black");
  }

  public newArray(): void {
  }

  public insertArray(): void {
  }

  public fillArray(): void {
  }

  public bindSearchKey(event: any) {
    this.searchKey = event.target.value;
  }

  public findArray(): boolean {
    if (this.messageOnError()) return false;
    const chosenCircleId = Math.floor(Math.random() * 19);
    d3.select(`#circle${chosenCircleId}`).style("fill", "#800080");
    const data: number[] = Array.from(Array(19).keys());
    for (let k = 0; k < data.length; k++) {
      if (k !== chosenCircleId)  d3.select(`#circle${k}`).style("fill", "#69a3b2");
    }
    return true;
  }

  public deleteArray(): boolean {
    if (this.messageOnError()) return false;
    return true;
  }

  private messageOnError(): boolean {
    if(!this.searchKey) {
      this._snackBar.open("Le nombre doit exister", "", {
        duration: 2000,
      });
      return true;
    }
    return false;
  }
}
