import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-student-list',
  imports: [CommonModule],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentList {
  students = [
    { name: 'PP', age:20},
    { name: 'ss', age :22}
  ];

getStudents(){
  return this.students;
}
}
