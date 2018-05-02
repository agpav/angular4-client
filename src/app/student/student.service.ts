import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Student } from './student';

@Injectable()
export class StudentService {

	//URL for CRUD operations
	studentUrl = "/service/students";

	//Create constructor to get Http instance
	constructor(private http: Http) {
	}

	//Fetch all students
	getAllStudents(): Observable<Student[]> {
		return this.http.get(this.studentUrl)
			.map(this.extractData)
			.catch(this.handleError);

	}

	//Create student
	createStudent(student: Student): Observable<number> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: cpHeaders });
		return this.http.post(this.studentUrl, student, options)
			.map(success => success.status)
			.catch(this.handleError);
	}

	//Fetch student by id
	getStudentById(studentId: string): Observable<Student> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: cpHeaders });
		console.log(this.studentUrl + "/" + studentId);
		return this.http.get(this.studentUrl + "/" + studentId)
			.map(this.extractData)
			.catch(this.handleError);
	}

	//Update student
	updateStudent(student: Student): Observable<number> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: cpHeaders });
		return this.http.put(this.studentUrl + "/" + student.id, student, options)
			.map(success => success.status)
			.catch(this.handleError);
	}

	//Delete student	
	deleteStudentById(studentId: string): Observable<number> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: cpHeaders });
		return this.http.delete(this.studentUrl + "/" + studentId)
			.map(success => success.status)
			.catch(this.handleError);
	}

	private extractData(res: Response) {
		let body = res.json();
		return body;
	}

	private handleError(error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.status);
	}
}