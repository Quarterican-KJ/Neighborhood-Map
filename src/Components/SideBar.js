import React, {Component} from "react";
import VenueList from "./VenueList";

export default class SideBar extends Component {
   render() {
      return (
      <div className = "SideBar">
            <input type = {"search"} id = {"search"} placeholder = {"filter venues"}/>
            <VenueList {...this.props} listItemClick = {this.props.listItemClick} />
      </div>)
   }
}