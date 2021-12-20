"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ArrayMethodsComponent = exports.LIST_OF_DOM_IDS = exports.YOU_MUST_FILL_ARRAY = exports.VALUE_IS_FOUND = exports.NUMBER_MUST_EXIST = void 0;
var core_1 = require("@angular/core");
var d3 = require("d3");
exports.NUMBER_MUST_EXIST = 'Number must exist';
exports.VALUE_IS_FOUND = 'Value has been found';
exports.YOU_MUST_FILL_ARRAY = 'You must fill array using the Fill button';
;
exports.LIST_OF_DOM_IDS = ['#arrayMethodVisual-col1', '#arrayMethodVisual-col2', '#arrayMethodVisual-col3'];
var ArrayMethodsComponent = /** @class */ (function () {
    function ArrayMethodsComponent(_snackBar, arrayMethodsService) {
        this._snackBar = _snackBar;
        this.arrayMethodsService = arrayMethodsService;
        this.currentIndex = 0;
        this.instanceArray = [];
        this.query = { Array: [], SearchKey: -1 };
    }
    ArrayMethodsComponent.prototype.ngOnInit = function () {
        this.initializeVisual();
    };
    ArrayMethodsComponent.prototype.initializeVisual = function () {
        var _this = this;
        exports.LIST_OF_DOM_IDS.forEach(function (Id, index) {
            _this.createVisual(Id, index * 50);
        });
    };
    ArrayMethodsComponent.prototype.createVisual = function (Id, index) {
        var svg = d3.select(Id).append('svg').attr('width', 300).attr('height', 450);
        var jsonCircles = [
            { x_axis: 50 + index, y_axis: 400, radius: 20, color: '#69a3b2', textIndex: 5 },
            { x_axis: 50 + index, y_axis: 350, radius: 20, color: '#69a3b2', textIndex: 4 },
            { x_axis: 50 + index, y_axis: 300, radius: 20, color: '#69a3b2', textIndex: 3 },
            { x_axis: 50 + index, y_axis: 250, radius: 20, color: '#69a3b2', textIndex: 2 },
            { x_axis: 50 + index, y_axis: 200, radius: 20, color: '#69a3b2', textIndex: 1 },
            { x_axis: 50 + index, y_axis: 150, radius: 20, color: '#69a3b2', textIndex: 0 }
        ];
        if (index / 50 === 1) {
            var k_1 = 12;
            jsonCircles.forEach(function (element) {
                element.textIndex = k_1;
                k_1 -= 1;
            });
        }
        if (index / 50 === 2) {
            var k_2 = 18;
            jsonCircles.forEach(function (element) {
                element.textIndex = k_2;
                k_2 -= 1;
            });
        }
        var circles = svg.selectAll('circle')
            .data(jsonCircles)
            .enter()
            .append('circle');
        var circleAttributes = circles
            .attr('id', function (d) { return "circle" + d.textIndex; })
            .attr('cx', function (d) { return d.x_axis; })
            .attr('cy', function (d) { return d.y_axis; })
            .attr('r', function (d) { return d.radius; })
            .style('fill', function (d) { return d.color; });
        var text = svg.selectAll('text')
            .data(jsonCircles)
            .enter()
            .append('text');
        var textLabels = text
            .attr('x', function (d) { return d.x_axis - 5; })
            .attr('y', function (d) { return d.y_axis - 5; })
            .text(function (d) { return d.textIndex; })
            .attr('font-family', 'sans-serif')
            .attr('font-size', '11.5px')
            .attr('font-weight', 'bold')
            .attr('fill', 'black');
    };
    ArrayMethodsComponent.prototype.newArray = function () {
        d3.selectAll('svg').remove();
        this.initializeVisual();
    };
    ArrayMethodsComponent.prototype.insertArray = function () {
        if (this.messageOnError())
            return false;
        return true;
    };
    ArrayMethodsComponent.prototype.fillArray = function () {
        var _this = this;
        this.arrayMethodsService.getArrayFromServer()
            .subscribe(function (data) {
            _this.instanceArray = data.values;
            var _loop_1 = function (k) {
                var selectedNode = d3.selectAll('text').filter(function (data) { return data.textIndex === k; });
                if (selectedNode)
                    selectedNode.text("<" + k + ":" + _this.instanceArray[k] + ">").attr('x', function (d) { return d.x_axis - 7; }).attr('y', function (d) { return d.y_axis - 7; });
            };
            for (var k = 0; k < _this.instanceArray.length; k++) {
                _loop_1(k);
            }
        });
    };
    ArrayMethodsComponent.prototype.bindSearchKey = function (event) {
        this.searchKey = event.target.value;
    };
    // will depend on some form choices (binary or linear)
    ArrayMethodsComponent.prototype.findArray = function () {
        var _this = this;
        // empeach find if array has not been populated:
        if (this.messageOnEmptyArray())
            return;
        if (this.messageOnError())
            return;
        this.query.Array = this.instanceArray;
        this.query.SearchKey = Number(this.searchKey);
        this.binarySearchResult$ = this.arrayMethodsService.getBinarySearchResult(this.query);
        this.binarySearchResult$.subscribe(function (data) {
            var id = data.visitedIndex[_this.currentIndex];
            if (id) {
                d3.select("#circle" + id).style('fill', '#800080');
                if (_this.query.SearchKey === _this.query.Array[id])
                    _this.messageOnFoundNumber();
            }
            for (var k = 0; k < data.visitedIndex.length; k++) {
                if (k !== id)
                    d3.select("#circle" + k).style('fill', '#69a3b2');
            }
            _this.currentIndex += 1;
        });
    };
    ArrayMethodsComponent.prototype.deleteArray = function () {
        if (this.messageOnError())
            return false;
        var chosenCircleId = Math.floor(Math.random() * 19);
        d3.select("#circle" + chosenCircleId).style('fill', 'grey');
        var selectedNode = d3.selectAll('text').filter(function (data) { return data.textIndex === chosenCircleId; });
        if (selectedNode)
            selectedNode.text('--');
        return true;
    };
    // may be move to a service all kind of errors:
    ArrayMethodsComponent.prototype.messageOnError = function () {
        if (!this.searchKey) {
            this._snackBar.open(exports.NUMBER_MUST_EXIST, '', {
                duration: 2000
            });
            return true;
        }
        return false;
    };
    ArrayMethodsComponent.prototype.messageOnEmptyArray = function () {
        if (this.instanceArray.length === 0) {
            this._snackBar.open(exports.YOU_MUST_FILL_ARRAY, '', {
                duration: 2000
            });
            return true;
        }
        return false;
    };
    ArrayMethodsComponent.prototype.messageOnFoundNumber = function () {
        this._snackBar.open(exports.VALUE_IS_FOUND, '', {
            duration: 2500
        });
        return;
    };
    ArrayMethodsComponent = __decorate([
        core_1.Component({
            selector: 'app-array-methods',
            templateUrl: './array-methods.component.html',
            styleUrls: ['./array-methods.component.css']
        })
    ], ArrayMethodsComponent);
    return ArrayMethodsComponent;
}());
exports.ArrayMethodsComponent = ArrayMethodsComponent;
