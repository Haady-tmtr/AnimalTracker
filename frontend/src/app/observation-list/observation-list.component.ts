import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observation } from '../models/observation.model';
import { Observable } from 'rxjs';
import { ObservationService } from '../services/observation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-observation-list',
  imports: [CommonModule],
  templateUrl: './observation-list.component.html',
  styleUrl: './observation-list.component.scss'
})
export class ObservationListComponent {
  observations!: Observable<Observation[]>;

  constructor(private observationService: ObservationService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.observations = this.observationService.all()
    
  }

  goToObservation(id : number): void {
    this.router.navigate(['/observation/'+id])
  }
}
