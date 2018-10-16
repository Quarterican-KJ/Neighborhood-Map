import React, {Component} from "react";

export default class Map extends Component {
   initMap = () => {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: 37.08476, lng: -94.51347},
        zoom: 12
      });
  
      const infowindow = new window.google.maps.InfoWindow();
      this.setState({
        map: map,
        infowindow: infowindow
      })
  
      this.state.venues.forEach(myVenue => {
        console.log(myVenue.venue.name);
        //marker
        const marker = new window.google.maps.Marker({
          position: {lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng},
          map: this.state.map,
          title: myVenue.venue.name,
          id: myVenue.venue.id,
          location: myVenue.venue.location.formattedAddress,
        })
  
        //onClick 
        marker.addListener('click', () => {
          this.openInfoWindow(marker);
        });
      });
    }
   }