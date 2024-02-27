import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-map-screen',
  templateUrl: './map-screen.component.html',
  styleUrl: './map-screen.component.css'
})
export class MapScreenComponent  implements OnInit {

  constructor(
    private placesService : PlacesService
  ) {

  }

  ngOnInit(): void {

  }

}
