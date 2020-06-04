import at from './at';


const setCurrentReviewer = (reviewer) => {
  return (dispatch, getState) => {
    dispatch({type: at.SET_CURRENT_REVIEWER, data: reviewer})

  }
};


export {
  setCurrentReviewer,
 }