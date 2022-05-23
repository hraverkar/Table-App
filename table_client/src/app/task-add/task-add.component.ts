import { SnackbarService } from './../services/snackbar.service';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss']
})
export class TaskAddComponent implements OnInit {
  public addTaskForm: FormGroup;
  public emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  public title = '';
  public description = '';
  public status = '';
  public createdby = '';
  public loginValid = true;
  constructor(private _dataService: DataService, private _snackBarService: SnackbarService) { }

  ngOnInit(): void {
  }

  public onTaskAdd() {
    this._dataService.addTask(this.title, this.description, this.status, this.createdby).subscribe((res) => {
      this._dataService.sendSuccessMsg(true);
      this._snackBarService.success(res.message);
    }, (error: any) => {
      this._snackBarService.error(error);
    });
  }
}
