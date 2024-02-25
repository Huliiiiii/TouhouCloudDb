import {debounce} from "lodash";
import * as R from "ramda";
import {For, createEffect, createResource, createSignal, onMount} from "solid-js";
import {createStore} from "solid-js/store";
import {fetchArtistByID} from "./fetch_data_functions";

export default function EditSongArtist(props) {
	let song_artist_count = 0;
	const [getSongArtistData, setSongArtistData] = createStore([]);

	async function fetchArtistByKeyword(keyword) {
		if (keyword === "") return null;
		const res = await fetch(`http://127.0.0.1:3007/api/search/artist?keyword=${keyword}`);
		if (res.ok) return res.json();
		return null;
	}
	const [getArtistInput, setArtistInput] = createSignal("");
	const [artist_result, {mutate, refetch}] = createResource(getArtistInput, fetchArtistByKeyword);
	onMount(async () => {
		let artist_data_old = undefined;
		if (props.song_data) {
			artist_data_old = await fetchArtistByID(props.song_data.artist);
		}
		if (artist_data_old) {
			R.forEach((obj) => {
				setSongArtistData([...getSongArtistData, {count: song_artist_count++, name: obj.name, id: obj.id}]);
			}, artist_data_old);
		}
		mutate();
	});
	createEffect(() => {});
	function addSongArtistInput(artist_id, artist_name) {
		setSongArtistData([...getSongArtistData, {count: song_artist_count++, id: artist_id ? artist_id : "", name: artist_name ? artist_name : ""}]);
	}

	function updateArtistResult(el) {
		const func1 = async () => {
			setArtistInput(el.value);
			refetch();
		};
		el.addEventListener("input", debounce(func1, 400));
	}
	const removeSongArtistInput = function (count) {
		setSongArtistData(getSongArtistData.filter((artists) => artists.count !== count));
	};
	return (
		<>
			{/* CSS TODO */}
			<div style={{display: "flex"}}>
				<table style={{display: "flex"}}>
					<tbody>
						<tr>
							<td>Artist </td>
						</tr>
						<For each={getSongArtistData}>
							{(artist) => (
								<>
									<tr>
										<td>
											<input type="text" name="artist" value={artist.id} hidden />
											<input type="text" value={artist.name} disabled />
										</td>
										<td>
											<button onClick={() => removeSongArtistInput(artist.count)}>Remove</button>
										</td>
									</tr>
								</>
							)}
						</For>
					</tbody>
					<tbody>
						<tr>
							<td>搜索艺术家</td>
						</tr>
						<tr>
							<td>
								<input type="text" use:updateArtistResult />
							</td>
						</tr>
						<For each={artist_result()}>
							{(artist) => (
								<tr>
									<td style={{border: "1px solid black"}} onClick={() => addSongArtistInput(artist.id, artist.name)}>
										{artist.name}
									</td>
								</tr>
							)}
						</For>
					</tbody>
				</table>
			</div>
		</>
	);
}
