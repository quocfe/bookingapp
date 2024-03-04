import './hotel.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCircleArrowLeft,
	faCircleArrowRight,
	faCircleXmark,
	faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import { EmailList, Header, NavBar } from '../../components';
import useFetch from '../../hooks/useFetch';
import { useLocation, useNavigate } from 'react-router-dom';
import { contantApi } from '../../constant/contantApi';
import { searchContext } from '../../context/SearchContext';
import { authContext } from '../../context/AuthContext';
import { el } from 'date-fns/locale';
import Reserve from '../../components/Reserve/Reserve';

const Hotel = () => {
	const [slideNumber, setSlideNumber] = useState(0);
	const [open, setOpen] = useState(false);
	const [openModel, setOpenModel] = useState(false);
	const { user } = useContext(authContext);
	const navigate = useNavigate();

	const photos = [
		{
			src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1',
		},
		{
			src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1',
		},
		{
			src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1',
		},
		{
			src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1',
		},
		{
			src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1',
		},
		{
			src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1',
		},
	];

	const handleOpen = (i) => {
		setSlideNumber(i);
		setOpen(true);
	};

	const handleMove = (direction) => {
		let newSlideNumber;

		if (direction === 'l') {
			newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
		} else {
			newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
		}

		setSlideNumber(newSlideNumber);
	};

	const path = useLocation();
	const id = path.pathname.split('/')[2];

	const { data, loading, error, reFetch } = useFetch(
		`${contantApi.hotels}/find/${id}`
	);

	const { dates } = useContext(searchContext);
	const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
	function dayDifference(date1, date2) {
		const timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
		const daysDiff = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
		return daysDiff;
	}

	const days = dayDifference(dates[0]?.endDate, dates[0]?.startDate);
	const handleClick = () => {
		if (user) {
			setOpenModel(true);
		} else {
			navigate('/auth/login');
		}
	};
	return (
		<div>
			<NavBar />
			<Header type="list" />
			<div className="hotelContainer">
				{open && (
					<div className="slider">
						<FontAwesomeIcon
							icon={faCircleXmark}
							className="close"
							onClick={() => setOpen(false)}
						/>
						<FontAwesomeIcon
							icon={faCircleArrowLeft}
							className="arrow"
							onClick={() => handleMove('l')}
						/>
						<div className="sliderWrapper">
							<img src={photos[slideNumber].src} alt="" className="sliderImg" />
						</div>
						<FontAwesomeIcon
							icon={faCircleArrowRight}
							className="arrow"
							onClick={() => handleMove('r')}
						/>
					</div>
				)}
				<div className="hotelWrapper">
					<button className="bookNow">Reserve or Book Now!</button>
					<h1 className="hotelTitle">{data.name}</h1>
					<div className="hotelAddress">
						<FontAwesomeIcon icon={faLocationDot} />
						<span>{data.adress || 'null'}</span>
					</div>
					<span className="hotelDistance">
						Excellent location – {data.distance} from center
					</span>
					<span className="hotelPriceHighlight">
						Book a stay over $114 at this property and get a free airport taxi
					</span>
					<div className="hotelImages">
						{data.photos?.map((photo, i) => (
							<div className="hotelImgWrapper" key={i}>
								<img
									onClick={() => handleOpen(i)}
									src={photo.src}
									alt=""
									className="hotelImg"
								/>
							</div>
						))}
					</div>
					<div className="hotelDetails">
						<div className="hotelDetailsTexts">
							<h1 className="hotelTitle">{data.title}</h1>
							<p className="hotelDesc">{data.desc}</p>
						</div>
						<div className="hotelDetailsPrice">
							<h1>Perfect for a {days}-night stay!</h1>
							<span>
								Located in the real heart of Krakow, this property has an
								excellent location score of 9.8!
							</span>
							<h2>
								<b>${data.cheapestPrice * days || 0}</b> ({days || 0} nights)
							</h2>
							<button onClick={handleClick}>Reserve or Book Now!</button>
						</div>
					</div>
				</div>
				<EmailList />
			</div>
			{openModel && <Reserve setOpen={setOpenModel} hotelId={id} />}
		</div>
	);
};

export default Hotel;
