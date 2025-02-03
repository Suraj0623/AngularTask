import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../shared/task';
import { TaskService } from '../../shared/task.service';
import { Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../shared/employee.service'; // Assuming you have an EmployeeService

@Component({
  selector: 'app-task-create',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {
  task: Task = {
    id: 0,
    title: '',
    description: '',
    employeeId: '',
    status: 'Pending',
    dueDate: '',
    assignedEmployee: {
      id: 0,
      name: '',
      department: ''
    }
  };
  
  employees: { id: number, name: string, department: string }[] = []; // Array to store employee list

  constructor(
    private taskService: TaskService,
    private employeeService: EmployeeService, // Inject EmployeeService to get employee data
    private router: Router
  ) {}

  ngOnInit(): void {
    // Load employee data when the component is initialized
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (err) => {
        console.error('Error fetching employees', err);
      }
    });
  }

  createTask(): void {
    console.log('Form data:', this.task); // Log task object for debugging

    // Only send employeeId, backend will associate it with the correct employee
    this.taskService.createTask(this.task).subscribe({
      next: (data: Task) => {
        console.log('Task created successfully', data);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error creating task', error);
      },
      complete: () => {
        console.log('Task creation process completed');
      }
    });
  }
}
