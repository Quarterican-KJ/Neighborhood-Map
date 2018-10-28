import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import SideBar from './Components/SideBar';
import NavBar from './Components/NavBar';

class App extends Component {
  state = {
    venues: [],
    map: null,
    infowindow: null,
    sidebarOpen: false,
    markers: [],
    marker: [],
    updateSuperState: obj => {
      this.setState(obj)
    },
    /* constructor(props) {
      this.toggleSideBar = this.toggleSideBar.bind(this);
    } */
  }
  
  /* toggleSideBar () {
    this.setState(state => ({ sidebarOpen: !state.sidebarOpen }));
  } */

  componentDidMount() {
    this.getVenues()
  }
//Load map from google API
  loadMap = () => {
    script("https://maps.googleapis.com/maps/api/js?key=AIzaSyDWX5qpzXd4w6U3L_bKPiTK3YvTHNSv_Nw&callback=initMap")
    window.initMap = this.initMap
  }
//Fetch Venues from Foursquare API
  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parm = {
      client_id: "AWSX5MOMPOKAB3Y0LSWD4GLGAIQTNVP4MKXWOITGKRWLSEPM",
      client_secret: "B0OSWWFO3VUIWYO1Y4D5IMCTK3REKYSQRC2KIXDGTHWBKFCT",
      query: "bar",
      near: "Joplin",
      v: "20182507"
    }
//Axios Parameters
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
//Initialize Map Over Joplin
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
    //place markers on map
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
//Create Info Window
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
//Open the info window when marker is clicked
  listItemClick = (venue) => {
      this.state.markers.map(marker => {
        if (marker.id === venue.id) {
          console.log(marker);
          console.log(venue);
          this.openInfoWindow(marker);
        } 
      });   
  }

  //Create NavBar
  /* menuKeyEnter(event) {
    var code = event.keyCode || event.which;
    if(code === 13) {
      this.toggleSideBar();
    }
  } */




//Render the app
  render() {
    /* let displaySidebar = this.state.sidebarOpen ? "block" : "none";
    let menuText = this.state.sidebarOpen ? "Close" : "Open"; */
    return (
      <div className = "App">
          <NavBar {...this.state}
            menuText={menuText}
            sidebarOpen={this.state.sidebarOpen}
            toggleSideBar={this.toggleSideBar} />
          <SideBar {...this.state}
            menuText={menuText}
            sidebarOpen={this.state.sidebarOpen}
            listItemClick = {this.listItemClick}
            toggleSideBar={this.toggleSideBar}
            displaySidebar={displaySidebar}  />
        <div id="map" role = "application" aria-hidden = "true"></div>
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