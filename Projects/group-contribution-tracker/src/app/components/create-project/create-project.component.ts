import { Component } from '@angular/core';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent {
  projectName = '';
  membersInput = '';

  constructor(private projectService: ProjectService) {}

  createProject() {
    if (this.projectName && this.membersInput) {
      const members = this.membersInput.split(',').map(m => m.trim()).filter(m => m.length > 0);
      if (members.length > 0) {
        this.projectService.createProject(this.projectName, members);
        this.projectName = '';
        this.membersInput = '';
      }
    }
  }
}
