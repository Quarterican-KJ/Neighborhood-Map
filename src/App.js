import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {
  state = {
    venues: []
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
      query: "food",
      near: "Joplin",
      v: "20182507"
    }

    axios.get(endPoint + new URLSearchParams(parm))
    .then(response => {
      this.setState({
        venues: response.data.response.groups[0].items
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
      zoom: 12
    });

    this.state.venues.map(myVenue => {
      const contentString = `${myVenue.venue.name}`

      //info Window
      const infowindow = new window.google.maps.InfoWindow({
        content: contentString
      });

      //marker
      const marker = new window.google.maps.Marker({
        position: {lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng},
        map: map,
        title: myVenue.venue.name
      })

      //onClick 
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });


    });
  }


  render() {
    return (
      <main>
        <div id="map"></div>
      </main>
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
