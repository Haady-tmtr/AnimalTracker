import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../services/animal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Animal } from '../models/animal.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-animal-form',
  imports: [FormsModule],
  templateUrl: './animal-form.component.html',
  styleUrls: ['./animal-form.component.scss']
})
export class AnimalFormComponent implements OnInit {

  animal: Animal = {
    nomCommun: '',
    nomSavant: '',
    embranchement: '',
    classe: '',
    ordre: '',
    sousOrdre: '',
    famille: '',
    genre: '',
    StatutIUCN: '',
    description: ''
  };

  constructor(
    private animalService: AnimalService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      const id = Number(idParam);
      this.animalService.get(id).subscribe(
        (a) => this.animal = a
      );
    }
  }

  goHome(): void { this.router.navigate(['/animals']); }

  createAnimal(): void {
    this.animalService.create(this.animal)
      .subscribe(
        (result) => {
          if (result) {
            this.goHome();
          }
        }
      );
  }

  removeAnimal(): void {
    if (this.animal.id !== undefined) {
      this.animalService.delete(this.animal.id)
        .subscribe(() => this.goHome());
    }
  }

  updateAnimal(): void {
    this.animalService.update(this.animal)
      .subscribe(() => this.goHome());
  }
}

