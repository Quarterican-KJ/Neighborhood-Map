import React, {Component} from "react";
import VenueList from "./VenueList";

export default class SideBar extends Component {
      constructor() {
            super()
            this.state = {
                  query:"",
                  results:[],
            }
      }
      filterVenues = () => {

      }

      componentWillReceiveProps = () => {
            this.setState({results: this.props.venues})
         } 

      updateQuery = (query) => {
            const value = query.target.value
            this.setState({query: value}, this.submitSearch(value));
         }
      
         submitSearch(query) {
               console.log(query);
             const filter = []  
            if(query === '') {
                this.setState({ results: this.props.venues })
                this.props.markers.forEach(marker => marker.setVisible(true))
            }
            else{
                  this.props.venues.forEach(venue => {
                        console.log(venue);                        
                        if(venue.venue.name.toLowerCase().includes(query.toLowerCase())) {
                              console.log(venue);
                              filter.push(venue);
                              this.props.markers.forEach(marker => {
                                    console.log(marker);
                                    if(marker.id===venue.venue.id) {
                                          console.log(venue);
                                          marker.setVisible(true)                                                                                    
                                    }
                                    else{
                                          marker.setVisible(false)
                                          //check why not resetting after clearing filter field, partly resetting
                                          //find workaround
                                    }                                    
                              })
                        }
                        console.log(filter);
                        this.setState({results: filter})
                        
                  })
            }
            
         }
/*       handleChange = e => {
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
      } */

   render() {
      return (
      <div className = "SideBar">
            <input 
            type = {"search"}
            id = {"search"} 
            placeholder = {"filter venues"}
            onChange = {this.updateQuery}
            />
            <VenueList venues = {this.state.results} 
            listItemClick = {this.props.listItemClick} 
            />
      </div>)
   }
}