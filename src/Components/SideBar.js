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

      componentWillReceiveProps = () => {
            this.setState({results: this.props.venues})
         } 

      updateQuery = (query) => {
            const value = query.target.value
            this.setState({query: value}, this.submitSearch(value));
         }
      
         submitSearch(query) {
            const filter = []
           if(query === '') {
               this.setState({ results: this.props.venues })
               this.props.markers.forEach(marker => marker.setVisible(true))
           }
           else{
                 this.props.markers.forEach(marker => {
                       marker.title.toLowerCase().includes(query.toLowerCase()) ?
                       marker.setVisible(true) :
                       marker.setVisible(false);
                 });

                 this.props.venues.forEach(venue => {
                       if(venue.venue.name.toLowerCase().includes(query.toLowerCase())) {
                         filter.push(venue);
                       }
                 })
                 this.setState({results: filter})
           }
        }

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