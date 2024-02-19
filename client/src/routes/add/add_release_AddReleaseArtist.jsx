import {For, Show, createSignal} from "solid-js";

let artist_count = 1;
let [artists, set_artists] = createSignal([]);

function AddReleaseArtist() {
	const AddArtistInput = function () {
		set_artists([
			...artists(),
			{
				count: artist_count++,
				id: "",
				name: ""
			}
		]);
	};
	const RemoveArtistInput = function (count) {
		set_artists(artists().filter((artists) => artists.count !== count));
	};

	return (
		<>
			<div class="credit_artist_div">
				<table id="credit_artist">
					<tbody>
						<tr>
							<td>
								<h4>发行艺术家</h4>
							</td>
							<td>
								<Show when={artists().length < 5} fallback={<button type="button">Max</button>}>
									<button type="button" onClick={AddArtistInput}>
										+
									</button>
								</Show>
							</td>
						</tr>
					</tbody>
					<tbody>
						<For each={artists()}>
							{(artist) => (
								<>
									<ul>
										<input type="text" class="artist_id" value={artist.id} />
										<Show when={artist.count !== Math.max(...artists().map((artist) => artist.count))}>
											{/* CSS TODO */}
											<input type="text" class="separator" style={{width: "30px"}} value="," />
										</Show>
										<button onClick={() => RemoveArtistInput(artist.count)}>-</button>
									</ul>
									<ul>{artist.name}</ul>
								</>
							)}
						</For>
					</tbody>
				</table>
			</div>
		</>
	);
}

export default AddReleaseArtist;
