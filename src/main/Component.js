import React from 'react';
// import PropTypes from "prop-types";
import "./main.scss";

import Employees from '../components/employees';
import Reviewers from '../components/reviewers';




class Main extends React.Component {

 

  render() {


    return (
      <div className="main" >
        	<div className="main-inner-wrapper">
            <Reviewers reviewersColection={this.props.reviewersColection}/> 
            <Employees/> 
          </div>
      </div>
    )
  }
}

// Main.propTypes = {
  
// };

export default Main;