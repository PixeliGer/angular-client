import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  public allEmployees(): Observable<any> {
    return this.http.get<any>(`${this.API_URI}/employees`).pipe(
      catchError(this.handleError)
    )
  }

  public getEmployees(): Observable<any> {
    return this.http.get<any>(`${this.API_URI}/employeesExample`).pipe(
      catchError(this.handleError)
    );
  }

  public getEmployee(id: string): Observable<any> {
    return this.http.get(`${this.API_URI}/employee/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  public getEmployeeTitles(id: string): Observable<any> {
    return this.http.get(`${this.API_URI}/employee/${id}/titles`).pipe(
      catchError(this.handleError)
    );
  }

  public addEmployee(employee: Employee): Observable<any> {
    return this.http.post(`${this.API_URI}/employee/add`, employee).pipe(
      catchError(this.handleError)
    );
  }

  public deleteEmployee(id: string): Observable<any> {
    return this.http.delete(`${this.API_URI}/employee/delete/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  // Handle Errors 
  handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
