import React, {Component} from "react";

export default class ListItem extends Component {
   render() {
      return (
            <li className = "listItem" onClick = {() => {
               this.props.listItemClick(this.props.venue)
            }}
            >{this.props.venue.name}</li>)
   }
}