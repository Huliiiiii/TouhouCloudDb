// createResoure的fetcher函数只能接受一个响应式的参数，这些函数用于这些用途
async function fetchSongByID(id: string | string[]) {
	if (!id) return null;
	const res = await fetch(`http://127.0.0.1:3007/api/search/song?id=${id}`);
	if (res.ok) return res.json();
	return null;
}

async function fetchArtistByID(id: string | string[]) {
	if (!id) return null;
	if (Array.isArray(id)) id = id.join(",");
	const res = await fetch(`http://127.0.0.1:3007/api/search/artist?id=${id}`);
	if (res.ok) return res.json();
	return null;
}
async function fetchArtistByKeyword(keyword: string) {
	if (keyword === "" && keyword.length === 0) return null;
	if (Array.isArray(keyword)) keyword = keyword.join(",");
	const res = await fetch(`http://127.0.0.1:3007/api/search/artist?keyword=${keyword}`);
	if (res.ok) return res.json();
	return null;
}
/**
 * Fetches data from the API based on the provided parameters.
 * @param {string} target_type - The type of data to fetch. Valid values: "song" or "artist"
 * @param {string} query_type - The type of query to perform. Valid values: "id" or "keyword".
 * @param {string} query_params - The parameters for the query.
 * @returns {Promise<Object|null>} - The data fetched from the API, or null if the response is not ok.
 */
async function fetchData(target_type: string, query_type: string, query_params: string | number) {
	const url = `http://127.0.0.1:3007/api/search`;
	const res = await fetch(`${url}/${target_type}?${query_type}=${query_params}`);
	if (res.ok) return res.json();
	return null;
}

export {fetchSongByID, fetchArtistByID, fetchArtistByKeyword, fetchData};
