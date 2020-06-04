import {connect} from 'react-redux';
import Component from './Component';
import {
    setCurrentReviewer,
  } from "./actions";



const stp = (s) => ({

});


const dtp = (d) => ({

    
    setCurrentReviewer: (reviewer) => {
        d(setCurrentReviewer(reviewer))
      },
});


export default connect(stp, dtp)(Component);


