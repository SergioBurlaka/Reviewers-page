import {connect} from 'react-redux';
import Component from './Component';
// import {
//   setUsers,
//   } from "./actions";



const stp = (s) => ({
  employees: s.employees.employeesColection,
  currentReviewer: s.reviewers.currentReviewer,

});


const dtp = (d) => ({



});


export default connect(stp, dtp)(Component);


