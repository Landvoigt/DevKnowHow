import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CreateCommandComponent } from './create-command/create-command.component';
import { CreateRoutineComponent } from './create-routine/create-routine.component';
import { NavigationService } from '@services/navigation.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, CreateCommandComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {

  constructor(public navService: NavigationService) { }
  
}