import { contantApi } from '../../constant/contantApi';
import useFetch from '../../hooks/useFetch';
import './hovelove.scss';

const HomeLove = () => {
	const { data, loading, error, reFetch } = useFetch(
		`${contantApi.hotels}?featured=true`
	);

	return (
		<div className="homelove">
			<div className="hlContainer">
				<div className="hlHeading">
					<h3 className="secHeading">Nhà ở mà khách yêu thích</h3>
				</div>
				<div className="hlContent">
					<div className="hlItems">
						{loading
							? 'Loading...'
							: data.map((item, index) => (
									<div className="singleHl" key={index}>
										<div className="img">
											<img
												src={
													item.photos[0] &&
													'https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=35b70a7e8a17a71896996cd55d84f742cd15724c3aebaed0d9b5ba19c53c430b&o='
												}
												alt="img"
											/>
										</div>
										<div className="text">
											<div className="top">
												<div className="topText">
													<h4>{item?.name}</h4>
													<span>{item?.city}</span>
												</div>
												<div className="topRating">
													<div className="ratingNumber">8.7</div>
													<div className="ratingContent">
														<span>Tuyệt vời</span>
														&nbsp;·&nbsp;
														<span>2.460 đánh giá</span>
													</div>
												</div>
											</div>
											<div className="bottom">
												<span>Bắt đầu từ</span>
												<h4>VND&nbsp;{item.cheapestPrice}</h4>
											</div>
										</div>
									</div>
							  ))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomeLove;
