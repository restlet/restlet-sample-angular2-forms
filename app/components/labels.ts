import {Component,Input,Output,OnInit,EventEmitter,ElementRef} from 'angular2/core';
import {NgClass,Control} from 'angular2/common';

@Component({
    selector: 'labels',
    template: `
      <div *ngIf="labels">
        <span *ngFor="#label of labels">
          <span  class="label label-info" style="font-size:13px"
            (click)="removeLabel(label)">
            {{label}} <span class="glyphicon glyphicon-remove" style="font-size:10px;" aria-hidden="true"></span>
          </span>&nbsp;
        </span>
        <span *ngIf="addAreaDisplayed">
          <span style="display:inline-block;">
            <input [(ngModel)]="labelToAdd" style="width: 50px; font-size: 14px;" class="custom"/>
            <em class="glyphicon glyphicon-ok text-muted" aria-hidden="true" (click)="addLabel(labelToAdd)"></em>
          </span>
        </span>
        <span *ngIf="!addAreaDisplayed">
          <span style="display:inline-block; margin-left: 5px;">
            <em class="glyphicon glyphicon-plus" aria-hidden="true" (click)="displayAddArea()"></em>
          </span>
        </span>
      </div>
    `
})
// http://jsfiddle.net/t1ppLrzy/1/
export class LabelsComponent implements OnInit {
  @Input()
  labels:string[];

  @Output()
  labelsChange: EventEmitter;

  constructor(private elementRef:ElementRef) {
    this.labelsChange = new EventEmitter();
    this.addAreaDisplayed = false;
  }

  ngOnInit() {
  	console.log('this.tags = '+this.labels);
  }

  removeLabel(label:string) {
    var index = this.labels.indexOf(label, 0);
    if (index != undefined) {
       this.labels.splice(index, 1);
       this.labelsChange.emit(this.labels);
    }
  }

  addLabel(label:string) {
    this.labels.push(this.labelToAdd);
    this.labelsChange.emit(this.labels);
    this.labelToAdd = '';
    this.addAreaDisplayed = false;
  }

  displayAddArea() {
    this.addAreaDisplayed = true;
  }
}