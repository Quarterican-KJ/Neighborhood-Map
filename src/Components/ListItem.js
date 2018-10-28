import React, {Component} from "react";

export default class ListItem extends Component {
      liKeyEnter = (event) => {
            var code = event.keyCode || event.which;
            if(code === 13) {
              this.props.listItemClick(this.props.venue);
            }
          }
   render() {
      return (
            <li tabIndex = "0" className = "listItem" onClick = {() => {
               this.props.listItemClick(this.props.venue)
            }}
            onKeyPress={this.liKeyEnter}>{this.props.venue.name}</li>)
   }
}