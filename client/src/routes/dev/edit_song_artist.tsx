import { For, createSignal, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import AddArtistCompoment from "../../compoments/edit_page_search_artist";
import { fetchArtistByID } from "./fetch_data_functions";

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

	const [inputLock, setInputLock] = createSignal<boolean>(true);

	true && updateArtistResult;
	function updateArtistResult(el: HTMLInputElement) {
		// el.addEventListener("compositionstart", () => setInputLock(true));
		// el.addEventListener("compositionend", () => setInputLock(false));
		// // el.addEventListener("input", debounce(func1, 400));
		// el.addEventListener("input", () => {
		// 	if (inputLock() === true) {
		// 		console.log(inputLock());
		// 		return;
		// 	} else {
		// 		console.log(inputLock());
		// 		setArtistInput(el.value);
		// 		refetch();
		// 	}
		// });
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
							<td>Artist Name</td>
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
					<AddArtistCompoment label="添加发行艺术家" addInput={addSongArtistInput} />
				</table>
			</div>
		</>
	);
}
