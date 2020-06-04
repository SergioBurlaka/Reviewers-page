import React  from 'react';
// import PropTypes from 'prop-types';
import './Reviewers.scss';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';



class Reviewers extends React.Component {
  state = {
    showMenu: false,
    currentItem: '',
    options:[]
  };

  componentDidMount() {
    this.setState({ 
      options: this.props.reviewersColection,
      currentItem: this.props.reviewersColection[0]
    });
    this.props.setCurrentReviewer(this.props.reviewersColection[0])
  }

  changeShowMwnu = () =>{
    const {showMenu} = this.state;
    this.setState({ showMenu: !showMenu });
  }

  setCurrentItem = (currentItem) =>{
    this.setState({ currentItem: currentItem[0] });
    this.props.setCurrentReviewer(currentItem[0])
  }


  render() {
    const {showMenu, options, currentItem} = this.state;

    return (
      <div className="reviewers">
        <div
         className={`reviewers-select ${ showMenu ? 'open-menu': ''}`} 
          onClick={() => {
                  this.changeShowMwnu()
                }} >
          <div className="reviewers-select__hrader">
            <span className="reviewers-select__current">
                {currentItem &&   <img className="icon-section" alt="" src={require(`../../assets/${currentItem.name}.jpg`)} />}
                <div className="wrapper">
                  <div className="title">
                    Reviewer
                  </div>
                  <div className="sub-title">
                    {currentItem.name}
                  </div>
                </div>
              </span>
            <div className="reviewers-select__icon">
              <FontAwesomeIcon icon={faChevronDown} /> 
            </div>
          </div>
          {showMenu &&
            <div className="reviewers-select__body">
              {options && options.length > 0  && options.map((item, index) => {
                return (
                  <div className="reviewers-select__item"
                    onClick={() => {
                      this.setCurrentItem(options.filter( (currentItem, currentIndex) => currentIndex === index))
                    }}
                    key={index}>
                    {item.name}
                    </div>
                )
                
              })}


            </div>
            }
          
        </div>
       
      </div>
    )
  }
}

// Reviewers.propTypes = {
//   deviceConnected: PropTypes.bool,
 
// };


export default Reviewers;