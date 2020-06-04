import React from 'react';
// import PropTypes from 'prop-types';
import './Employees.scss';

import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faChevronLeft, faBan, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faCheckSquare } from '@fortawesome/free-regular-svg-icons';

class Employees extends React.Component {
	state = {
		listEmployee: [],
		timeInterval: [],
		disableNextDayHandler: true
	};

	componentDidMount() {
		this.createTimeInterval();
	}

	formateDateToDayMonth = (date) => {
		return moment(date).format('D MMM');
	};

	createTimeInterval = () => {
		let template = [ 1, 1, 1, 1, 1, 1, 1, 1, 1 ];
		let timeInterval = template.map((item, index) => {
			let dayAtWeek = 7;
			let weekAgo = -dayAtWeek * index;
			return moment().day(weekAgo).format('YYYYMMDD');
		});

		this.setState({ timeInterval: timeInterval });
		return timeInterval;
	};

	nextDayInterval = () => {
		const { timeInterval, listEmployee } = this.state;
		const nextTimeInterval = timeInterval.map((item, index) => {
			return this.addDayToCurrentDate(item);
		});

		console.log("nextTimeInterval", nextTimeInterval)
		console.log("isIntervlAheadOfCurrentDay", )

		if(this.isIntervlAheadOfCurrentDay(nextTimeInterval)){
			this.setState({ disableNextDayHandler: true });
			return
		}

		let disablegandler = this.isIntervlCurrentDay(nextTimeInterval)
		this.setState({ disableNextDayHandler: disablegandler });
		

		this.setState({ timeInterval: nextTimeInterval }, () => {
			const timeIntervalsForEmployees = this.getTimeIntervalsForEmployees(listEmployee);
			this.setState({ listEmployee: timeIntervalsForEmployees });
		});

	};


	isIntervlCurrentDay = (nextInterval) =>{
		let nextReportDay = moment().day(0).format('YYYYMMDD');
		return nextInterval.indexOf(nextReportDay) !== -1
	}

	isIntervlAheadOfCurrentDay = (nextInterval) =>{
		let nextReportDay = moment().day(7).format('YYYYMMDD');
		return nextInterval.indexOf(nextReportDay) !== -1
	}

	previosDayInterval = () => {
		const { timeInterval, listEmployee } = this.state;
		const previosTimeInterval = timeInterval.map((item, index) => {
			return this.subtractDayFromCurrentDate(item);
		});
		this.setState({ timeInterval: previosTimeInterval }, () => {
			const timeIntervalsForEmployees = this.getTimeIntervalsForEmployees(listEmployee);
			this.setState({ listEmployee: timeIntervalsForEmployees });
		});
		this.setState({ disableNextDayHandler: false });
	};

	addDayToCurrentDate = (date) => {
    let dayAtWeek = 7;
		return moment(date).add(dayAtWeek, 'days').format('YYYYMMDD');
	};

	subtractDayFromCurrentDate = (date) => {
    let dayAtWeek = 7;
		return moment(date).subtract(dayAtWeek, 'days').format('YYYYMMDD');
	};

	checkCurrentDate = (employee) => {
		let previosReportDay = moment().day(0).format('YYYYMMDD');
		return employee.weeks_with_submitted_reports.indexOf(previosReportDay) !== -1
	};

	getCurrentreportDay = (employee) => {
		return moment().day(0).format('D MMM')
	};

	getCurrentday = () => {
		console.log('moment().day()', moment().day());
		console.log('moment().day(0)', moment().day(0).format('YYYYMMDD'));
		console.log('moment().day(0)', moment().day(-7).format('YYYYMMDD'));
		console.log('moment().day(0)', moment().day(-14).format('YYYYMMDD'));
		console.log('moment().day(0)', moment().day(-21).format('YYYYMMDD'));

		// console.log('moment().day(0)', moment().day(0).format('D MMM'))
		// console.log('moment().day(0)', moment().day(-3).format('D MMM'))
		// console.log('moment().day(0)', moment().day(-10).format('D MMM'))
		// console.log('moment().day(0)', moment().day(-17).format('D MMM'))
	};

	formateTime = () => {
		let formatedDate = moment().format('YYYYMMDD');
		let formatedDateDayMonth = moment().format('D MMM');
		let formatedDateAnyDate = moment('20200503');
		// let formatedDateYesterday = moment().subtract(7, 'days');
		let formatedDatePreviosDay = moment().subtract(1, 'days').format('YYYYMMDD');
		let formatedDateNextDay = moment().add(1, 'days').format('YYYYMMDD');
		let formatedDateNextDayMyInput = moment('20200512').add(1, 'days').format('YYYYMMDD');

		console.log('formatedDateNextDayMyInput ', formatedDateNextDayMyInput);
		console.log('formatedDatePreviosDay ', formatedDatePreviosDay);
		console.log('formatedDateNextDay ', formatedDateNextDay);

		console.log('formatedDate ', formatedDate);
		console.log('formatedDateDayMonth ', formatedDateDayMonth);
		console.log('formatedDateAnyDate ', formatedDateAnyDate);
	};

	getTimeIntervalsForEmployees = (employeeColection) => {
		const { timeInterval } = this.state;
		const currentInterval = !timeInterval.length ? this.createTimeInterval() : timeInterval;

		employeeColection.forEach((item, index) => {
			item.reportsForCurrentInterval = currentInterval.map((date, indexInterval) => {
				return item.weeks_with_submitted_reports.indexOf(date) !== -1;
			});
		});

		return employeeColection;
	};

	UNSAFE_componentWillReceiveProps(next) {
		const { employees } = this.props;

		if (next.currentReviewer) {
			const newEmployee = employees.filter((item) => item.email === next.currentReviewer.email);
			const timeIntervalsForEmployees = this.getTimeIntervalsForEmployees(newEmployee);
			this.setState({ listEmployee: timeIntervalsForEmployees });
		}
	}

	render() {
		const { listEmployee, timeInterval, disableNextDayHandler } = this.state;

		return (
			<div className="employees">
				<div className="employees-wrapper">
					<div className="employees-list">
						<div className="employees-list-item" />

						<div className="header-wrapper">
							<div className="employees-list-header header-width">
								<span className="status">Employee / Domain</span>
								<span className="date">{this.getCurrentreportDay()} (Current)</span>
							</div>
							<div className="interval">
								<div
									className={`interval-button ${disableNextDayHandler ? 'disable' : ''}`}
									onClick={() => {
										this.nextDayInterval();
									}}
								>
									<FontAwesomeIcon className="icon-section" icon={faChevronLeft} />
								</div>
								{timeInterval.map((item, index) => {
									return (
										<div className="interval-wrapper__item" key={index}>
											{this.formateDateToDayMonth(item)}
										</div>
									);
								})}
								<div
									className="interval-button"
									onClick={() => {
										this.previosDayInterval();
									}}
								>
									<FontAwesomeIcon className="icon-section" icon={faChevronRight} />
								</div>
							</div>
						</div>

						{listEmployee.map((item, index) => {
							return (
								<div className="employees-item" key={index}>
									<div className="employee-card header-width">
										<span className="employee-card__info">
											<img className="icon-section" alt="" src={require('../../assets/MeeseeksHQ.png')} />
											<div className="wrapper">
												<div className="title">{item.name}</div>
												<div className="sub-title">
													<FontAwesomeIcon icon={faUserFriends} />
													People Operations
												</div>
											</div>
										</span>
										<div className="employee-card__status">
											{ this.checkCurrentDate(item) ? <div className="submited">Submited</div> : <div className="pending">Pending</div>}
										</div>
									</div>
									<div className="intervals-report">
										<div className="damb-box" />
										{item.reportsForCurrentInterval.map((itemInterval, indexInterval) => {
											return (
												<div className="intervals-report__item" key={indexInterval}>
													{itemInterval ? (
														<FontAwesomeIcon className="check" icon={faCheckSquare} />
													) : (
														<FontAwesomeIcon className="uncheck" icon={faBan} />
													)}
												</div>
											);
										})}
										<div className="damb-box" />
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		);
	}
}

// Employees.propTypes = {
// 	deviceConnected: PropTypes.bool
// };

export default Employees;
