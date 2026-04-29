import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  @Input() projectId!: number;
  project: Project | undefined;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.project = this.projectService.getProject(this.projectId);
  }
}
