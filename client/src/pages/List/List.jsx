import './list.scss';
import { Header, NavBar, SearchItem } from '../../components';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import useFetch from '../../hooks/useFetch';
import { contantApi } from '../../constant/contantApi';

const List = () => {
	const location = useLocation();
	const [openDate, setOpenDate] = useState(false);
	const [destination, setDestination] = useState(location?.state.destination);
	const [date, setDate] = useState(location?.state.dates);
	const [options, setOptions] = useState(location?.state.options);
	const [min, setMin] = useState(undefined);
	const [max, setMax] = useState(undefined);

	const { data, loading, error, reFetch } = useFetch(
		`${contantApi.hotels}?city=${destination}&min=${min || 0}&max=${
			max || 99999999
		}`
	);

	const handleClick = () => {
		reFetch();
	};

	return (
		<>
			<NavBar />
			<Header type="list" />
			<div className="listContainer">
				<div className="listWrapper secContainer">
					<div className="listSearch">
						<h1 className="lsTitle">Search</h1>

						<div className="lsItem itemDestination">
							<label>Destination</label>
							<input
								type="text"
								placeholder={destination}
								defaultValue={destination}
							/>
						</div>

						<div className="lsItem itemDate">
							<label>Check-in Date</label>
							<span onClick={() => setOpenDate(!openDate)}>{`${format(
								date[0]?.startDate,
								'dd/MM/yyyy'
							)} to ${format(date[0]?.endDate, 'dd/MM/yyyy')}`}</span>
							{openDate && (
								<DateRange
									onChange={(item) => setDate([item.selection])}
									minDate={new Date()}
									ranges={date}
								/>
							)}
						</div>

						<div className="lsItem">
							<label>Options</label>
							<div className="formItem">
								<label htmlFor="minprice">Min price (per night)</label>
								<input
									id="minprice"
									type="text"
									onChange={(e) => setMin(e.target.value)}
								/>
							</div>
							<div className="formItem">
								<label htmlFor="maxprice">Max price (per night)</label>
								<input
									id="maxprice"
									type="text"
									onChange={(e) => setMax(e.target.value)}
								/>
							</div>
							<div className="formItem">
								<label htmlFor="adult">Adult</label>
								<input
									id="adult"
									type="number"
									min={1}
									defaultValue={options?.adults}
								/>
							</div>
							<div className="formItem">
								<label htmlFor="children">children</label>
								<input
									id="children"
									type="number"
									min={1}
									defaultValue={options?.children}
								/>
							</div>
							<div className="formItem">
								<label htmlFor="room">room</label>
								<input
									id="room"
									type="number"
									min={1}
									defaultValue={options?.room}
								/>
							</div>
						</div>

						<button className="searchBtn" onClick={handleClick}>
							Search
						</button>
					</div>
					<div className="listResult">
						{loading
							? 'Loading...'
							: data.map((item, index) => (
									<SearchItem item={item} key={index} />
							  ))}
					</div>
				</div>
			</div>
		</>
	);
};

export default List;
