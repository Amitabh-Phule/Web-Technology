import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StudentsServices {
  students =[
    {name:"amitabh", age:21, course:"openCV"},
    {name:"abhinav", age:22, course:"python"},
    {name:"rahul", age:23, course:"java"}
  ]
  getStudents(){
    return this.students;
  }
}
