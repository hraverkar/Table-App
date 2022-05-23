import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _httpClient: HttpClient) { }
  private _successMsgSource = new Subject<boolean>();
  successMsg$ = this._successMsgSource.asObservable();

  public sendSuccessMsg(message: boolean) {
    this._successMsgSource.next(message);
  }

  public getAllTasks(): Observable<any> {
    return this._httpClient.get<void>(environment.URIPort + '/api/gettask').pipe(
      catchError(error => this.handleErrorObservable(error)));
  }

  public addTask(title: string, description: string, status: string, createdBy: string): Observable<any> {
    return this._httpClient.post<void>(environment.URIPort + '/api/addtask', {
      title: title,
      description: description,
      status: status,
      createdBy: createdBy
    }).pipe(
      catchError(error => this.handleErrorObservable(error)));
  }

  public handleErrorObservable(error: Response | any): Observable<any> {
    return throwError(error.message || error);
  }

}
