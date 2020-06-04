import {connect} from 'react-redux';
import Component from './Component';


const stp = (state) => ({
  reviewersColection: state.reviewers.reviewersColection
});

const dtp = (dispatch) => ({
 
});

export default connect(stp, dtp)(Component);