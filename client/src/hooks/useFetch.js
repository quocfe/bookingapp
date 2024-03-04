import { useEffect, useState } from 'react';
import axios from 'axios';
import { hotelsApi } from '../api/hotels.js';

const useFetch = (url) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		(async () => {
			setLoading(true);
			try {
				const res = await axios.get(url);
				setData(res.data);
			} catch (error) {
				console.log(error);
			}
			setLoading(false);
		})();
	}, []);

	const reFetch = async () => {
		setLoading(true);
		try {
			const res = await axios.get(url);
			setData(res.data);
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	};

	return { data, loading, error, reFetch };
};

export default useFetch;
