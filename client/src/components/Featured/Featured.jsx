import { contantApi } from '../../constant/contantApi.js';
import useFetch from '../../hooks/useFetch';
import './featured.scss';

const images = [
	'https://q-xx.bstatic.com/xdata/images/xphoto/263x210/57584488.jpeg?k=d8d4706fc72ee789d870eb6b05c0e546fd4ad85d72a3af3e30fb80ca72f0ba57&o=',
	'https://r-xx.bstatic.com/xdata/images/hotel/263x210/100235855.jpeg?k=5b6e6cff16cfd290e953768d63ee15f633b56348238a705c45759aa3a81ba82b&o=',
	'https://q-xx.bstatic.com/xdata/images/hotel/263x210/119467716.jpeg?k=f3c2c6271ab71513e044e48dfde378fcd6bb80cb893e39b9b78b33a60c0131c9&o=',
	'https://r-xx.bstatic.com/xdata/images/xphoto/263x210/45450084.jpeg?k=f8c2954e867a1dd4b479909c49528531dcfb676d8fbc0d60f51d7b51bb32d1d9&o=',
];

const Featured = () => {
	const { data, loading, error, reFetch } = useFetch(
		`${contantApi.hotels}/countByType`
	);

	return (
		<div className="featured">
			<div className="feaContainer">
				<h3 className="secHeading">Tìm theo loại chỗ nghỉ</h3>
				{loading ? (
					'Loading...'
				) : (
					<div className="feaItems">
						{data &&
							images.map((el, index) => {
								return (
									<div key={index} className="feaSingle">
										<div className="feaImg">
											<img src={el} alt="" />
										</div>
										<h4 className="feaTitle">{data[index]?.type}</h4>
										<span>
											{data[index]?.count} {data[index]?.type}
										</span>
									</div>
								);
							})}
					</div>
				)}
			</div>
		</div>
	);
};

export default Featured;
