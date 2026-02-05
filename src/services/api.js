import axios from "axios";
import { BASE_URL, API_KEY } from "../config/configApi.js";

export const getMovies = async (page, option = "popular") => {
	const res = await axios.get(`${BASE_URL}/movie/${option}?page=${page}`, {
		params: {
			api_key: API_KEY,
		},
	});
	return res.data;
};

export const getOneData = async (id, category) => {
	const res = await axios.get(`${BASE_URL}/${category}/${id}`, {
		params: {
			api_key: API_KEY,
		},
	});

	return res.data;
};

export const searchData = async (page, option = "movie", q) => {
	const res = await axios.get(`${BASE_URL}/search/${option}?page=${page}`, {
		params: {
			api_key: API_KEY,
			query: q,
		},
	});
	return res.data;
};

export const getTVData = async (page, option = "popular") => {
	const res = await axios.get(`${BASE_URL}/tv/${option}?page=${page}`, {
		params: {
			api_key: API_KEY,
		},
	});
	return res.data;
};
