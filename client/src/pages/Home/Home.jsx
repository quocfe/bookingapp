import './home.scss';
import {
	Header,
	NavBar,
	Featured,
	Trending,
	Explore,
	HomeLove,
	EmailList,
	Footer,
} from '../../components';

const Home = () => {
	return (
		<>
			<NavBar />
			<Header />
			<div className="home">
				<div className="secContainer">
					<Featured />
					<Trending />
					<Explore />
					<HomeLove />
				</div>
				<EmailList />
				<Footer />
			</div>
		</>
	);
};

export default Home;
