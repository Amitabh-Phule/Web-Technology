import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { TaskBoardComponent } from './components/task-board/task-board.component';
import { MemberStatsComponent } from './components/member-stats/member-stats.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    CreateProjectComponent,
    ProjectDetailComponent,
    TaskBoardComponent,
    MemberStatsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
