import { Component } from '@angular/core';
import { StudentsServices } from '../services/students-services';

@Component({
  selector: 'app-students-list',
  imports: [],
  templateUrl: './students-list.html',
  styleUrl: './students-list.css',
})
export class StudentsList {
  students: any[]=[]; // any[] it means it can store any type of data
  /**
   *
   */
  constructor(private studentsService: StudentsServices) {}
  ngOnInit(){
    this.students=this.studentsService.getStudents();
  }
}