import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feature, PlacesResponce } from '../interfaces/places';
import { environment } from '../../../environments/environment';

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
    private http : HttpClient
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
    // todo evaluar cuand oel query es un nulo

    this.isLoadingPlaces =true ;

    this.http.get<PlacesResponce>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?proximity=-73.990593%2C40.740121&language=es&access_token=${ environment.apiKey }`)
    .subscribe(
      res => {
        console.log(res.features);

        this.isLoadingPlaces =false ;
        this.places = res.features

      }
    );
  }

}
