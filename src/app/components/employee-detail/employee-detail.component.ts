import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit, AfterViewInit {
  employee: Employee | any;
  employeeTitles: [] | any = [];

  constructor(private route: ActivatedRoute,
    private employeeService: EmployeesService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // Check the emp_no on the params
    const routerParams = this.route.snapshot.paramMap;
    const _employeeNo = routerParams.get('emp_no') as string;
    // Callinng the employee services
    this.getEmployeeDetails(_employeeNo);
    this.getEmployeeTitles(_employeeNo);
  }

  public getEmployeeDetails(emp_no: string) {
    this.employeeService.getEmployee(emp_no).subscribe(
      (response: any) => {
        response.filter((_employee: any) => this.employee = _employee);
      }
    )
  }

  public getEmployeeTitles(emp_no: string) {
    this.employeeService.getEmployeeTitles(emp_no).subscribe(
      (response: any) => {
        this.employeeTitles = response;
      }
    )
  }

}
