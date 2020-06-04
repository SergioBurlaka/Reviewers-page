import update from 'immutability-helper';
import at from './at';
import initState from './initState';

export default (state = initState, actions) => {

  switch (actions.type) {
  
     
      case at.SET_CURRENT_REVIEWER:
        return update(state, {
          currentReviewer:{$set: actions.data}
      });
   

    default:
      return state;
  }
}