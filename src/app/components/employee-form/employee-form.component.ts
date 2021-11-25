import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup = new FormGroup({});
  genders = [
    { value: 'F' }, { value: 'M' }, { value: 'Other' }
  ];

  get f(): { [key: string]: AbstractControl } {
    return this.employeeForm.controls;
  }


  constructor(private formBuilder: FormBuilder,
    private employeeService: EmployeesService,
    private router: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.employeeForm = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      birth_date: [new Date(), [Validators.required]],
      hire_date: [new Date(), [Validators.required]]
    })
  }

  submit() {
    if (this.employeeForm.valid) {
      const _empForm = this.employeeForm.value;
      const _employee: Employee = { ..._empForm }

      // Format Dates
      _employee.birth_date = moment(_employee.birth_date).format('YYYY-MM-DD');
      _employee.hire_date = moment(_employee.hire_date).format('YYYY-MM-DD');

      this.addEmployee(_employee);
    }
  }

  // Error form validation
  public hasError(controlName: string, errorName: string) {
    return this.employeeForm.controls[controlName].hasError(errorName);
  }

  public addEmployee(employee: Employee) {
    this.employeeService.addEmployee(employee).subscribe({
      next: res => {
        this.employeeForm.reset();

        this._snackBar.open('Employee added successfully', '', {
          duration: 3000
        });

        this.router.navigate(['/']);
      },
      error: err => { console.log(err); }
    })
  }
}
