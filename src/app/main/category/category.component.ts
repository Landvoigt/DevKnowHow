import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Item } from '@models/command.model';
import { CommandService } from '@services/command.service';
import { VariablePipe } from '@pipes/variable.pipe';
import { RestService } from '@services/rest.service';
import { ErrorService } from '@services/error.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, VariablePipe],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {
  categoryId: number | null = null;
  data: Item[] = [];

  constructor(private route: ActivatedRoute, public commandService: CommandService, private rest: RestService, private error: ErrorService) { }

  ngOnInit(): void {
    this.getCategoryId();
    this.loadData();
  }

  getCategoryId() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.categoryId = +id;
        this.loadData();
      }
    });
  }

  loadData() {
    if (this.categoryId) {
      this.rest.getCommandsByCategory(this.categoryId).subscribe({
        next: (commands: Item[]) => {
          this.data = commands;
        },
        error: (error) => this.error.handleHttpError(error, {}),
        complete: () => { }
      });
    }
  }
}