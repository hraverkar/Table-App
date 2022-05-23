import { SnackbarService } from './../services/snackbar.service';
import { DataService } from './../services/data.service';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ITask } from '../interface/itask';
import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {

  public constructor(private _dataService: DataService, private _snackbarService: SnackbarService) { }
  public dataSource: MatTableDataSource<ITask>;
  public displayedColumns: string[] = ['title', 'description', 'status', 'createdAt', 'updatedAt', 'createdBy'];

  public selection = new SelectionModel<ITask>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this._dataService.successMsg$.subscribe((res) => {
      if (res) {
        this.getAllTasks();
      }
    });
    this.getAllTasks();
  }

  public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  public masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  public checkboxLabel(row?: ITask): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row._id + 1}`;
  }

  public getAllTasks(): void {
    this._dataService.getAllTasks().subscribe((res) => {
      this.dataSource = new MatTableDataSource<ITask>(res.tasks);
      this.dataSource.paginator = this.paginator;
    }, (error) => {
      this._snackbarService.error(error);
    });
  }

  ngAfterViewInit() {

  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
