import { Injectable } from '@angular/core';
import { Feature, PlacesResponce } from '../interfaces/places';
import { PlacesApiClient } from '../api';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation ?: [number ,  number]  ;
  public isLoadingPlaces : boolean = false ;
  public places : Feature[] = [] ;

  get isUserLocationReady ( ): boolean {
    return  !!this.userLocation
  }

  constructor(
    private placesApi : PlacesApiClient,
    private mapService : MapService ,
  ) {
    this.getUserLocation();
  }

  public async getUserLocation() : Promise<[number , number]> {
      return new Promise (  ( resolve , reject  ) => {

        navigator.geolocation.getCurrentPosition(
          (  {  coords  } ) =>{
            this.userLocation = [ coords.longitude , coords.latitude ] ;
             resolve(  this.userLocation );
          },
          ( err  ) => {

             alert('No se pudo obtener la geolocalizacion ');
             console.log(err);
             reject();

          }
        );


      }  );
  }


  getPlacesByQuery( query : string = '' ){
    if (query.length === 0) {
      this.places = [];
      this.isLoadingPlaces = false ;
      return ;
    }

    if (!this.userLocation) {
      throw Error('No hay userLocation')
    }

    this.isLoadingPlaces =true ;

    this.placesApi.get<PlacesResponce>(`/${query}.json` , {
      params: {
        // proximity: this.userLocation.join(',')
      }
    } )
    .subscribe(
      res => {
        console.log(res.features);

        this.isLoadingPlaces =false ;
        this.places = res.features ;
        this.mapService.createMarkesFromPlaces( this.places ) ;

      }
    );
  }

}
