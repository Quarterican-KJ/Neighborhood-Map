import React, {Component} from "react";
import VenueList from "./VenueList";

export default class SideBar extends Component {
      constructor() {
            super()
            this.state = {
                  query:"",
            }
      }
      filterVenues = () => {

      }
      handleChange = e => {
            this.setState({query: e.target.value })
            const markers = this.props.venues.map(venue => {
                  const isMatched = venue.name.toLowerCase().includes(e.target.value.toLowerCase())
                  const marker = this.props.markers.find(marker => marker.id === venue.id)
                  console.log("matched");
                  
                  if (isMatched) {
                        marker.isVisable = true;
                  }
                  else {
                        marker.isVisable = false
                  }
                  return marker;
            })
            this.props.updateSuperState({markers})
      }

   render() {
      return (
      <div className = "SideBar">
            <input 
            type = {"search"}
            id = {"search"} 
            placeholder = {"filter venues"}
            onChange = {this.handleChange}
            />
            <VenueList {...this.props} 
            listItemClick = {this.props.listItemClick} 
            />
      </div>)
   }
}