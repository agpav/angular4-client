import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { StudentService } from './student.service';
import { Student } from './student';

@Component({
	selector: 'app-student',
	templateUrl: './student.component.html',
	styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

	//Component properties
	allStudents: Student[];
	statusCode: number;
	requestProcessing = false;
	studentIdToUpdate = null;
	processValidation = false;

	//Create form
	studentForm = new FormGroup({
		name: new FormControl('', Validators.required),
		passportNumber: new FormControl('', Validators.required)
	});

	//Create constructor to get service instance
	constructor(private studentService: StudentService) {
	}

	//Create ngOnInit() and and load students
	ngOnInit(): void {
		this.getAllStudents();
	}

	//Fetch all students
	getAllStudents() {
		this.studentService.getAllStudents()
			.subscribe(
				data => this.allStudents = data,
				errorCode => this.statusCode = errorCode);
	}

	//Handle create and update student
	onStudentFormSubmit() {
		this.processValidation = true;
		if (this.studentForm.invalid) {
			return; //Validation failed, exit from method.
		}

		//Form is valid, now perform create or update
		this.preProcessConfigurations();
		let student = this.studentForm.value;

		if (this.studentIdToUpdate === null) {
			//Generate student id then create student
			this.studentService.getAllStudents()
				.subscribe(students => {

					//Generate student id	 
					let maxIndex = students.length - 1;
					let studentWithMaxIndex = students[maxIndex];
					let studentId = studentWithMaxIndex.id + 1;
					student.id = studentId;

					//Create student
					this.studentService.createStudent(student)
						.subscribe(successCode => {
							this.statusCode = successCode;
							this.getAllStudents();
							this.backToCreateStudent();
						},
							errorCode => this.statusCode = errorCode
						);
				});
		} else {
			//Handle update student
			student.id = this.studentIdToUpdate;
			this.studentService.updateStudent(student)
				.subscribe(successCode => {
					this.statusCode = successCode;
					this.getAllStudents();
					this.backToCreateStudent();
				},
					errorCode => this.statusCode = errorCode);
		}
	}

	//Load student by id to edit
	loadStudentToEdit(studentId: string) {
		this.preProcessConfigurations();
		this.studentService.getStudentById(studentId)
			.subscribe(student => {
				this.studentIdToUpdate = student.id;
				this.studentForm.setValue({ name: student.name, passportNumber: student.passportNumber });
				this.processValidation = true;
				this.requestProcessing = false;
			},
				errorCode => this.statusCode = errorCode);
	}

	//Delete student
	deleteStudent(studentId: string) {
		this.preProcessConfigurations();
		this.studentService.deleteStudentById(studentId)
			.subscribe(successCode => {
				//this.statusCode = successCode;
				//Expecting success code 204 from server
				this.statusCode = 204;
				this.getAllStudents();
				this.backToCreateStudent();
			},
				errorCode => this.statusCode = errorCode);
	}

	//Perform preliminary processing configurations
	preProcessConfigurations() {
		this.statusCode = null;
		this.requestProcessing = true;
	}

	//Go back from update to create
	backToCreateStudent() {
		this.studentIdToUpdate = null;
		this.studentForm.reset();
		this.processValidation = false;
	}
}
