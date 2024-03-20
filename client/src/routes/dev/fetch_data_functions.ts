// createResoure的fetcher函数只能接受一个响应式的参数，这些函数用于这些用途
const url = import.meta.env.VITE_SERVER_URL as string;

async function fetchSongByID(id: string | string[]) {
	if (id == undefined) return;
	if (Array.isArray(id)) id = id.join(",");
	const res = await fetch(`${url}/api/search/song?id=${id}`);
	if (res.ok) return res.json();
	return;
}

async function fetchArtistByID(id: string | string[]) {
	if (id == undefined) return;
	if (Array.isArray(id)) id = id.join(",");
	const res = await fetch(`${url}/api/search/artist?id=${id}`);
	if (res.ok) return res.json();
	return;
}
async function fetchArtistByKeyword(keyword: string) {
	if (keyword === "" && keyword.length === 0) return;
	if (Array.isArray(keyword)) keyword = keyword.join(",");
	const res = await fetch(`${url}/api/search/artist?keyword=${keyword}`);
	if (res.ok) return res.json();
	return;
}

/**
 * Fetch data from server
 * @param target_type target type, must be one of "artist", "release" or "song"
 * @param query_type query type, must be one of "id" or "keyword"
 * @param query_params query parameters, must be a string, an array of strings, or a Set of strings
 * @returns a Promise of an array of objects
 * @throws {Error} if the query_params is invalid or the API returns a 400 error
 * @throws {undefined} if the API returns any other error
 */
async function fetchData(
	target_type: "artist" | "release" | "song",
	query_type: "id" | "keyword",
	query_params: string | string[] | Set<string> | undefined
): Promise<unknown[] | undefined> {
	if (query_params == undefined) return;
	if (query_params == "") return;
	if (Array.isArray(query_params)) {
		query_params = query_params.toString();
	} else if (query_params instanceof Set) {
		query_params = [...query_params].toString();
	}
	const res = await fetch(
		`${url}/api?type=${target_type}&${query_type}=${query_params}`
	);
	if (res.ok) return res.json() as Promise<unknown[]>;
	else if (res.status === 400) {
		const errMsg = await res.text();
		throw errMsg;
	} else {
		throw null;
	}
}

export { fetchSongByID, fetchArtistByID, fetchArtistByKeyword, fetchData };
