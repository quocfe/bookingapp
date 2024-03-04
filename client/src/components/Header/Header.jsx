import './header.scss';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faBed,
	faCalendarDays,
	faCar,
	faPerson,
	faPlane,
	faTaxi,
} from '@fortawesome/free-solid-svg-icons';
import { DateRange } from 'react-date-range';
import { useContext, useState } from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { searchContext } from '../../context/SearchContext';

const Header = ({ type }) => {
	const [destination, setDestination] = useState('');
	const [activeDate, setActiveDate] = useState(false);
	const [activeOptons, setActiveOptons] = useState(false);
	const navigate = useNavigate();

	const [dates, setDates] = useState([
		{
			startDate: new Date(),
			endDate: new Date(),
			key: 'selection',
		},
	]);
	const [options, setOptions] = useState({
		adults: 1,
		children: 1,
		room: 1,
	});

	const handleOption = (name, oparation) => {
		setOptions((prev) => {
			return {
				...prev,
				[name]: oparation == 'i' ? options[name] + 1 : options[name] - 1,
			};
		});
	};

	const { dispatch } = useContext(searchContext);

	const handleSearch = () => {
		dispatch({ type: 'NEW_SEARCH', payload: { destination, dates, options } });
		navigate('/hotels', { state: { destination, dates, options } });
	};

	return (
		<div className="header">
			<div
				className={type === 'list' ? 'secContainer listMode' : 'secContainer'}
			>
				<div className="headerList">
					<div className="headerListItem active">
						<FontAwesomeIcon icon={faBed} />
						<span>Stays</span>
					</div>

					<div className="headerListItem">
						<FontAwesomeIcon icon={faCar} />
						<span>Cars</span>
					</div>

					<div className="headerListItem">
						<FontAwesomeIcon icon={faPlane} />
						<span>Flights</span>
					</div>

					<div className="headerListItem">
						<FontAwesomeIcon icon={faTaxi} />
						<span>Taxi</span>
					</div>
				</div>
				{type !== 'list' && (
					<>
						<h1 className="headerTitle">A life time of discount?</h1>
						<p className="headerDesc">
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti
							temporibus amet quibusdam, assumenda nemo perferendis non eveniet
							eaque error earum doloremque maiores id dicta cum reiciendis
							ducimus veritatis exercitationem natus!
						</p>
						<button className="headerBtn">Sign in / Register</button>
						<div className="headerSearch">
							<div className="singleItem">
								<FontAwesomeIcon className="icon" icon={faBed} />
								<input
									type="text"
									placeholder="Where are you going?"
									onChange={(e) => setDestination(e.target.value)}
								/>
							</div>

							<div className="singleItem">
								<FontAwesomeIcon className="icon" icon={faCalendarDays} />
								<span onClick={() => setActiveDate(!activeDate)}>{`${format(
									dates[0].startDate,
									'MM-dd-yyyy'
								)} to ${format(dates[0].endDate, 'MM-dd-yyyy')}`}</span>
								{activeDate && (
									<DateRange
										editableDateInputs={true}
										onChange={(item) => setDates([item.selection])}
										moveRangeOnFirstSelection={false}
										ranges={dates}
										className="dateRange"
									/>
								)}
							</div>

							<div className="singleItem">
								<FontAwesomeIcon className="icon" icon={faPerson} />
								<span
									onClick={() => setActiveOptons(!activeOptons)}
								>{`${options.adults} adults ${options.children} children ${options.room} room `}</span>
								{activeOptons && (
									<div className="options">
										<div className="adultsOption singleOption">
											<h3 className="singleTitle">adults</h3>
											<div className="singleBtn">
												<button
													disabled={options.adults <= 1}
													onClick={() => handleOption('adults', 'd')}
												>
													-
												</button>
												<span>{options.adults}</span>
												<button onClick={() => handleOption('adults', 'i')}>
													+
												</button>
											</div>
										</div>

										<div className="childrenOption singleOption">
											<h3 className="singleTitle">children</h3>
											<div className="singleBtn">
												<button
													disabled={options.children <= 0}
													onClick={() => handleOption('children', 'd')}
												>
													-
												</button>
												<span>{options.children}</span>
												<button onClick={() => handleOption('children', 'i')}>
													+
												</button>
											</div>
										</div>

										<div className="roomOption singleOption">
											<h3 className="singleTitle">room</h3>
											<div className="singleBtn">
												<button
													disabled={options.room <= 1}
													onClick={() => handleOption('room', 'd')}
												>
													-
												</button>
												<span>{options.room}</span>
												<button onClick={() => handleOption('room', 'i')}>
													+
												</button>
											</div>
										</div>
									</div>
								)}
							</div>

							<div className="singleItem">
								<button className="headerBtn" onClick={handleSearch}>
									Search
								</button>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Header;
