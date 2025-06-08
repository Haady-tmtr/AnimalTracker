import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Animal } from '../models/animal.model';
import { AnimalService } from '../services/animal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-animal-list',
  imports: [FormsModule, AsyncPipe],
  templateUrl: './animal-list.component.html',
  styleUrl: './animal-list.component.scss'
})

export class AnimalListComponent implements OnInit {
  animals!: Observable<Animal[]>;

  constructor(private animalService: AnimalService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.animals = this.animalService.all()
  }

  goToAnimal(id : number): void {
    this.router.navigate(['/animal/'+id])
  }
}

