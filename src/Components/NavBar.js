import React, {Component} from "react";

export default class NavBar extends Component {
  menuKeyEnter = (event) => {
    var code = event.keyCode || event.which;
    if(code === 13) {
      this.props.toggleSideBar();
    }
  }
  render() {
    return (
       <nav id="navbar">
        <h3 id="head-text">Neighborhood Maps</h3>
        <h3 tabIndex="1" className="transition menu-text" title={ this.props.menuText + " Sidebar" }
          onClick={() => { this.props.toggleSideBar() }} onKeyPress={this.menuKeyEnter}>
          {
            this.props.sidebarOpen ?
            <i className="material-icons" style={{lineHeight: "inherit"}}>clear</i> :
            <i className="material-icons" style={{lineHeight: "inherit"}}>menu</i>
          }
          </h3>
        </nav> 
  )}
}

