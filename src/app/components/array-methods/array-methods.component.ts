import { Component, OnInit, Input } from '@angular/core';
import * as d3 from "d3";
export const MAX_ELEMENTS = 18;
@Component({
  selector: 'app-array-methods',
  templateUrl: './array-methods.component.html',
  styleUrls: ['./array-methods.component.css']
})

export class ArrayMethodsComponent implements OnInit {
  public searchKey: number;
  public svg1: any;
  public svg2: any;
  public svg3: any;

  constructor() { }

  ngOnInit(): void {
    this.initVisual();
  }

  initVisual() {
    this.svg1 = d3.select("#arrayMethodVisual-col1").append("svg").attr("width", 300).attr("height", 450);
    this.svg2 = d3.select("#arrayMethodVisual-col2").append("svg").attr("width", 300).attr("height", 450);
    this.svg3 = d3.select("#arrayMethodVisual-col3").append("svg").attr("width", 300).attr("height", 450);
    [this.svg1, this.svg2, this.svg3].forEach((svgElement:any, index: number) => {
      this.createVisual(svgElement, index*50);
    });
  }

  private createVisual(svg: any, index: number) {
    const jsonCircles = [
      { "x_axis": 50 + index, "y_axis": 400, "radius": 20, "color" : "#69a3b2" },
      { "x_axis": 50 + index, "y_axis": 350, "radius": 20, "color" : "#69a3b2"},
      { "x_axis": 50 + index, "y_axis": 300, "radius": 20, "color" : "#69a3b2"},
      { "x_axis": 50 + index, "y_axis": 250, "radius": 20, "color" : "#69a3b2" },
      { "x_axis": 50 + index, "y_axis": 200, "radius": 20, "color" : "#69a3b2"},
      { "x_axis": 50 + index, "y_axis": 150, "radius": 20, "color" : "#69a3b2"}];
    const circles = svg.selectAll("circle")
                               .data(jsonCircles)
                               .enter()
                               .append("circle");
    const circleAttributes = circles
                          .attr("cx", function (d) { return d.x_axis; })
                          .attr("cy", function (d) { return d.y_axis; })
                          .attr("r",  function (d) { return d.radius; })
                          .attr('stroke', 'black')
                          .style("fill", function(d) { return d.color; });
  }

  newArray(): void {
    alert('ok');
  }

  insertArray(): void {

  }

  fillArray(): void {
  
  }

  bindSearchKey(event: any) {
    this.searchKey = event.target.value;
  }

  findArray(): boolean {
    alert(this.searchKey);
    return true;
  }

  deleteArray(): void {
  }

}
