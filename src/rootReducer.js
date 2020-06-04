import { combineReducers } from 'redux';
import reviewers from './components/reviewers/reducer';
import employees from './components/employees/reducer';


export default combineReducers({
  reviewers,
  employees,
})