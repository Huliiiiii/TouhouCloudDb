import { debounce } from "lodash";
import { For, createResource, createSignal, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import { fetchArtistByID, fetchArtistByKeyword } from "./fetch_data_functions";

interface artist_data {
	id: number | string;
	name: string;
}

interface song_data {
	id: number | string;
	title: string;
	artist: Array<string>;
	credits: Array<string>;
	duration: string;
	lyrics: string;
	is_deleted: number;
}

export default function EditSongArtist(props: { song_data: song_data | null }) {
	const [songArtist, setSongArtist] = createStore<artist_data[]>([]);
	const [getArtistInput, setArtistInput] = createSignal("");
	const [artist_result, { refetch }] = createResource(getArtistInput, fetchArtistByKeyword);
	onMount(async () => {
		if (props.song_data) {
			let artist_data: artist_data[] = await fetchArtistByID(props.song_data.artist);
			if (artist_data) {
				setSongArtist([
					...songArtist,
					...artist_data.map((artist: artist_data) => ({
						id: artist.id,
						name: artist.name
					}))
				]);
			} else {
				console.log("Cannot fetch artist data");
			}
		}
	});

	function addSongArtistInput(artist: artist_data) {
		if (!songArtist.some((song_artist) => song_artist.id === artist.id)) {
			setSongArtist([...songArtist, { id: artist.id, name: artist.name }]);
		} else {
			alert("Song artist already exist");
		}
	}
	true && updateArtistResult;
	function updateArtistResult(el: HTMLInputElement) {
		const func1 = async () => {
			setArtistInput(el.value);
			refetch();
		};
		el.addEventListener("input", debounce(func1, 400));
	}

	const removeSongArtist = function (artist: artist_data) {
		// const idx = songArtist.indexOf(artist);
		// setSongArtist((c) => [...c.slice(0, idx), ...c.slice(idx + 1)]);
		setSongArtist(songArtist.filter((item) => item !== artist));
	};

	return (
		<>
			{/* CSS TODO */}
			<div style={{ display: "flex" }}>
				<table style={{ display: "flex" }}>
					<tbody>
						<tr>
							<td>Artist </td>
						</tr>
						<For each={songArtist}>
							{(artist: artist_data, index) => (
								<>
									<tr>
										<td>
											<input type="text" name="artist" value={artist.id} hidden />
											<input type="text" value={artist.name} disabled />
										</td>
										<td>
											<button type="button" onClick={[removeSongArtist, artist]}>
												Remove
											</button>
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
									<td style={{ border: "1px solid black" }} onClick={[addSongArtistInput, artist]}>
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
