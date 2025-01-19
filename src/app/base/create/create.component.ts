import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { fadeIn } from '@utils/animations';
import { CommandComponent } from './command/command.component';
import { RoutineComponent } from './routine/routine.component';
import { NavigationService } from '@services/navigation.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, CommandComponent, RoutineComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
  animations: [fadeIn]
})
export class CreateComponent {

  constructor(public navService: NavigationService) { }
  
}