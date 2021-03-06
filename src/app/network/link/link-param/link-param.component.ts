import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { MatDialog, MatMenuTrigger } from '@angular/material';

import { ModelConfigDialogComponent } from '../../../model/model-config-dialog/model-config-dialog.component';
import { AppService } from '../../../app.service';

import { AppLink } from '../../../classes/appLink';


@Component({
  selector: 'app-link-param',
  templateUrl: './link-param.component.html',
  styleUrls: ['./link-param.component.scss']
})
export class LinkParamComponent implements OnInit {
  @Input() link: AppLink;
  @Input() random: boolean = true;
  @Input() options: any;
  @Input() value: any;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  @ViewChild(MatMenuTrigger, { static: false }) contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  constructor(
    private _appService: AppService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  setDefaultValue(): void {
    this.value = Number(this.options.value);
    this.valueChange.emit(this.value);
  }

  addFactor(): void {
    if (!this.link.hasOwnProperty('params')) {
      this.link['params'] = {};
    }

    this.link['params'][this.options.id] = {
      factors: ['g'],
    }
  }

  setRandom(): void {
    this.value = { parametertype: 'constant', specs: { value: this.value } };
  }

  isNumber(): boolean {
    return typeof this.value == 'number';
  }

  onFactorClick(factor): void {
    console.log(factor)
  }

  onValueChange(value: any): void {
    this.valueChange.emit(value)
  }

  onMouseOver(event: MouseEvent): void {
    this._appService.rightClick = true;
  }

  onMouseOut(event: MouseEvent): void {
    this._appService.rightClick = false;
  }

  onContextMenu(event: MouseEvent): void {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.openMenu();
  }

}
