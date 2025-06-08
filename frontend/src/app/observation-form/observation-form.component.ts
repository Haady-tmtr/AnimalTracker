import { Component, OnInit } from '@angular/core';
import { ObservationService } from '../services/observation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location} from '@angular/common';
import { Observation } from '../models/observation.model';
import { FormsModule } from '@angular/forms';
import { Animal } from '../models/animal.model';
import { Observable } from 'rxjs';
import { AnimalService } from '../services/animal.service';

@Component({
  selector: 'app-observation-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './observation-form.component.html',
  styleUrls: ['./observation-form.component.scss']
})
export class ObservationFormComponent implements OnInit {

  observation: Observation = {
    date : new Date(),
    latitude : 0.0,
    longitude: 0.0,
    description : '',
    animal : ''
  };

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

  animals!: Observable<Animal[]>

  constructor(
    private observationService: ObservationService,
    private animalService: AnimalService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      const id = Number(idParam);
      this.observationService.get(id).subscribe(
        (a) => this.observation = a
      );
    }
    else {
      this.animals = this.animalService.all()
    }
  }

  goHome(): void { this.router.navigate(['/observations']); }

  createObservation(): void {
    this.observation.animal = "/api/animals/"+this.observation.animal
    this.observationService.create(this.observation)  
      .subscribe(
        (result) => {
          if (result) {
            this.goHome();
          }
        }
      );
  }

  removeObservation(): void {
    if (this.observation.id !== undefined) {
      this.observationService.delete(this.observation.id)
        .subscribe(() => this.goHome());
    }
  }

  updateObservation(): void {
    this.observationService.update(this.observation)
      .subscribe(() => this.goHome());
  }
}