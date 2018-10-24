import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import SideBar from './Components/SideBar';

class App extends Component {
  state = {
    venues: [],
    map: null,
    infowindow: null,
    markers: [],
    marker: [],
    updateSuperState: obj => {
      this.setState(obj)
    }
  }

  componentDidMount() {
    this.getVenues()
  }

  loadMap = () => {
    script("https://maps.googleapis.com/maps/api/js?key=AIzaSyCrUw5GDV04cCKVWcsY7--oNcDmfHHnCZw&callback=initMap")
    window.initMap = this.initMap
  }

  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parm = {
      client_id: "AWSX5MOMPOKAB3Y0LSWD4GLGAIQTNVP4MKXWOITGKRWLSEPM",
      client_secret: "B0OSWWFO3VUIWYO1Y4D5IMCTK3REKYSQRC2KIXDGTHWBKFCT",
      query: "bar",
      near: "Joplin",
      v: "20182507"
    }

    axios.get(endPoint + new URLSearchParams(parm))
    .then(response => {
      this.setState({
        venues: response.data.response.groups[0].items,
      }, this.loadMap())
      console.log();
    })
    .catch(error => {
      console.log("Error!! " + error);      
    })
  }

  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.08476, lng: -94.51347},
      zoom: 10
    });

    const infowindow = new window.google.maps.InfoWindow();
    const bounds = new window.google.maps.LatLngBounds();

    this.setState({
      map: map,
      infowindow: infowindow
    })
    
    const allMarkers = [];
    this.state.venues.forEach(myVenue => {
      //marker
      const marker = new window.google.maps.Marker({
        position: new window.google.maps.LatLng(myVenue.venue.location.lat, myVenue.venue.location.lng),
        map: this.state.map,
        title: myVenue.venue.name,
        id: myVenue.venue.id,
        location: myVenue.venue.location.formattedAddress,
      })
      allMarkers.push(marker);
      console.log(marker.position);
      bounds.extend(marker.position);
      //onClick 
      marker.addListener('click', () => {
        this.openInfoWindow(marker);
      });
    });
    map.fitBounds(bounds);
    this.setState({
      markers: allMarkers
    });
  }

  openInfoWindow = (marker) => {
    const contentString = `<h2>${marker.title}</h2>
    <p>${marker.location}</p>`;
    const { map } = this.state;
    this.state.infowindow.setContent(contentString);
    this.state.infowindow.open(map, marker);
    marker.setAnimation(window.google.maps.Animation.BOUNCE);
    // marker animation via setTimeout lasts 2 seconds
    setTimeout(() => marker.setAnimation(null), 1550);


  }

  listItemClick = (venue) => {
      this.state.markers.map(marker => {
        if (marker.id === venue.id) {
          console.log(marker);
          console.log(venue);
          this.openInfoWindow(marker);
        } 
      });   
  }

  render() {
    return (
      <div className = "App">
          <SideBar {...this.state} listItemClick = {this.listItemClick}  />
        <div id="map"></div>
      </div>
    );
  }
}

function script(url) {
   const index = window.document.getElementsByTagName("script")[0]
   const script = window.document.createElement("script")
   script.src = url
   script.async = true
   script.defer = true
   index.parentNode.insertBefore(script, index)
}

export default App;