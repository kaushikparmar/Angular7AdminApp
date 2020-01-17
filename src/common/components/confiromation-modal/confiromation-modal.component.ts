import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  content: string;
  }

@Component({
  selector: 'pb-confiromation-modal',
  templateUrl: './confiromation-modal.component.html',
  styleUrls: ['./confiromation-modal.component.scss']
})
export class ConfiromationModalComponent implements OnInit {



  constructor(
    public dialogRef: MatDialogRef<ConfiromationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}


  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
