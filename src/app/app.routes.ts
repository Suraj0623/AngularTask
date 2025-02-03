import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskCreateComponent } from './components/task-create/task-create.component';
import { TaskEditComponent } from './components/task-edit/task-edit.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {
        path: '',
        component: TaskListComponent
    },
    {
        path:'create',
        component:TaskCreateComponent
    },
    {
        path: 'edit/:id',
        component:TaskEditComponent
    },
    {
        path:'details/:id',
        component:TaskDetailsComponent
    },
    
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}
