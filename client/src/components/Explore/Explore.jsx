import useFetch from '../../hooks/useFetch.js';
import './explore.scss';
import { contantApi } from './../../constant/contantApi.js';

const Explore = () => {
	const { data, loading, error, reFetch } = useFetch(
		`${contantApi.hotels}/countByCity?cities=Da Nang,Hoi An,Hue`
	);
	return (
		<div className="explore">
			<div className="exContainer">
				<div className="exHeading">
					<h3 className="secHeading">Khám phá Việt Nam</h3>
					<p className="secSubHeading">
						Các điểm đến phổ biến này có nhiều điều chờ đón bạn
					</p>
				</div>
				<div className="exContent">
					<div className="exploreItems">
						{loading ? (
							'Loading...'
						) : (
							<>
								<div className="singleExplore">
									<div className="img">
										<img
											src="https://statics.vinpearl.com/cau-rong-da-nang-0_1629438622.png"
											alt=""
										/>
									</div>
									<div className="title">
										<h4>Đà Nẵng</h4>
										<span>{data[0]} chổ nghỉ</span>
									</div>
								</div>
								<div className="singleExplore">
									<div className="img">
										<img
											src="https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/08/hoi-an-quang-nam-vntrip.jpg"
											alt=""
										/>
									</div>
									<div className="title">
										<h4>Hội An</h4>
										<span>{data[1]} chổ nghỉ</span>
									</div>
								</div>
								<div className="singleExplore">
									<div className="img">
										<img
											src="https://localvietnam.com/wp-content/uploads/2021/04/hue-imperial-gate.jpg"
											alt=""
										/>
									</div>
									<div className="title">
										<h4>Hue</h4>
										<span>{data[2]} chổ nghỉ</span>
									</div>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Explore;
