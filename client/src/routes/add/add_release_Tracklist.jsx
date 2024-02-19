import {Show, For, createSignal} from "solid-js";
/* eslint-disable no-unused-vars */

let track_count = 0;
let [tracks, set_tracks] = createSignal([]);

function EditTracklist() {
	const AddTrack = function () {
		set_tracks([
			...tracks(),
			{
				count: track_count++,
				id: "",
				title: "",
				length: ""
			}
		]);
	};

	const RemoveTrack = function (count) {
		set_tracks(tracks().filter((track) => track.count !== count));
	};
	const RemoveAllTrack = function () {
		set_tracks([]);
	};
	return (
		<>
			<div>
				<h4>曲目列表</h4>
				<table id="track_list">
					<tbody>
						<tr>
							<td>序号</td>
							<td>ID</td>
							<td>标题</td>
							<td>长度</td>
							<td>
								<Show when={tracks().length < 50} fallback={<button type="button">Max</button>}>
									<button type="button" onClick={AddTrack}>
										+
									</button>
								</Show>
							</td>
							<td>
								<Show when={tracks().length >= 1}>
									<button type="button" onClick={RemoveAllTrack}>
										清空
									</button>
								</Show>
							</td>
						</tr>
						<For each={tracks()}>
							{(track) => (
								<>
									<tr>
										<td>
											{/* CSS TODO */}
											<input type="text" class="track_number" style={{width: "30px"}} />
										</td>
										<td>
											<input type="text" class="track_id" value={track.id} style={{width: "30px"}} />
										</td>
										<td>
											<input type="text" class="track_title" value={track.title} />
										</td>
										<td>
											<input type="text" class="track_length" value={track.length} style={{width: "30px"}} />
										</td>
										<td>
											<button onClick={() => RemoveTrack(track.count)}>-</button>
										</td>
									</tr>
								</>
							)}
						</For>
					</tbody>
				</table>
			</div>
		</>
	);
}

export default EditTracklist;
