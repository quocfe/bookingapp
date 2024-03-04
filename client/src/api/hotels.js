import axios from 'axios';
import { contantApi } from '../constant/contantApi.js';

export const hotelsApi = {
	countByCity: async (params) => {
		const res = await axios.get(`${contantApi.hotels}/${params}`);
		return res.data;
	},
	countByType: async (params) => {
		const res = await axios.get(`${contantApi.hotels}/${params}`);
		return res.data;
	},
};
