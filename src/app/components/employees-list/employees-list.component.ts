import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employee.service';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {

  employees: Employee[] = [];
  displayedColumns: string[] = ['emp_no', 'first_name', 'last_name', 'gender', 'birth_date', 'hire_date', 'actions'];
  dataSource = new MatTableDataSource<Employee>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private employeeService: EmployeesService,
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  public openDialog(emp_no: string): void {
    this.dialog.open(AlertDialogComponent, {
      data: `Are you sure you want to delete?`
    }).afterClosed().subscribe((_confirm: Boolean) => {
      if (_confirm) { this.deleteEmployee(emp_no); }
    })
  }

  public getEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: employees => {
        this.employees = employees as Employee[];
        this.dataSource.paginator = this.paginator;
        this.dataSource.data = this.employees;
        this.dataSource.sort = this.sort;
      },
      error: err => { console.log(err) }
    });
  }

  public deleteEmployee(emp_no: string) {
    this.employeeService.deleteEmployee(emp_no).subscribe({
      next: res => {
        this._snackBar.open('Employee deleted successfully', '', {
          duration: 3000
        });
        // On Success Deleting element refresh table
        this.getEmployees();
      },
      error: err => { console.log(err); }
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public employeeDetails(emp_no: string) {
    this.router.navigate(['employee/', emp_no]);
  }
}
