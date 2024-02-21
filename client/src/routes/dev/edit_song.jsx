import {MetaProvider, Title} from "@solidjs/meta";
import {useParams} from "@solidjs/router";
import {createResource, Switch, Match, For, createEffect, createRenderEffect} from "solid-js";
import {createStore} from "solid-js/store";
import * as R from "ramda";
const fetchSong = async () => {
	const res = await fetch(`http://127.0.0.1:3007/api/search/song?id=${useParams().id}`);
	return res.json();
};
const fetchArtist = async (id) => {
	const res = await fetch(`http://127.0.0.1:3007/api/search/artist?id=${id}`);
	return res.json();
};

const DevEditSong = function () {
	const [song_data] = createResource(fetchSong);
	// eslint-disable-next-line no-unused-vars
	// const [artist_data, setArtistData] = createStore();
	// const artist_id_arr = [];
	// const artist_name_arr = [];

	// createEffect(function () {
	// 	if (song_data()) {
	// 		R.forEach(async function (obj) {
	// 			artist_id_arr.push(obj.credit_artist_id);
	// 			let [aritst] = await fetchArtist(obj.credit_artist_id);
	// 			artist_name_arr.push(aritst.name);
	// 		}, song_data()[0].credits);
	// 		console.log(artist_name_arr);
	// 	}
	// });

	const EditCredits = () => {
		let credit_count = 0;
		let fetch_data_count = 0;
		const [credits, setCredits] = createStore([]);
		createEffect(() => {
			if (song_data() && fetch_data_count < 1) {
				R.forEach(async (obj) => {
					let [artist] = await fetchArtist(obj.credit_artist_id);
					setCredits([
						...credits,
						{count: credit_count++, credit_artist_id: obj.credit_artist_id, credit_artist_name: artist.name, credit_role: obj.credit_role}
					]);
				}, song_data()[0].credits);
				fetch_data_count++;
			}
		});
		const addCreditInput = () => {
			setCredits([
				...credits,
				{
					count: credit_count++,
					credit_artist_id: "",
					credit_role: ""
				}
			]);
		};
		function removeCreditInput(count) {
			setCredits(credits.filter((credit) => credit.count !== count));
		}

		function creditProcessor(input) {
			const input_copy = R.clone(input);
			const prpcessed_credits = R.forEach((obj) => {
				delete obj.count;
			}, input_copy);
			return prpcessed_credits;
		}
		// const [artist, setArtist] = createStore([]);

		const handleArtistIdInput = (el) => {
			el.addEventListener("input", async (e) => {
				if (e.currentTarget.value !== "" && !isNaN(e.currentTarget.value)) {
					const artistId = e.currentTarget.value;
					const res = await fetch(`http://127.0.0.1:3007/api/search/artist/?id=${artistId}`);
					const [artistData] = await res.json();

					const artistNameContainer = el.nextElementSibling;
					artistNameContainer.textContent = artistData.name;
				}
				// setCredits(i, "credit_artist_id", e.currentTarget.value);
			});
		};

		return (
			<>
				<div>
					<For each={credits}>
						{(credit, i) => (
							<>
								{/* CSS TODO */}
								<div style={{display: "flex", "justify-content": "space-between"}}>
									<div>
										<ul>
											艺术家ID
											<input
												type="text"
												// name="credit_artist_id"
												value={credit.credit_artist_id}
												onInput={(e) => {
													return setCredits(i(), {credit_artist_id: e.currentTarget.value, credit_artist_name: fetchArtist(e.currentTarget.value)});
												}}
												use:handleArtistIdInput
												size="5"
												required
											/>
											<div>{credit.credit_artist_name}</div>
											化名
											<input
												type="text"
												// name="credit_artist_id"
												value={credit.override_credit_name ? credit.override_credit_name : ""}
												onInput={(e) => setCredits(i(), "override_credit_name", e.currentTarget.value)}
												size="5"
											/>
										</ul>
										<ul>
											角色
											<input
												type="text"
												// name="credit_role"
												value={credit.credit_role}
												onInput={(e) => setCredits(i(), "credit_role", e.currentTarget.value)}
												size="15"
												required
											/>
										</ul>
									</div>
									<div>
										<button onClick={() => removeCreditInput(credit.count)}>移除艺术家</button>
									</div>
								</div>
							</>
						)}
					</For>
				</div>
				<button type="button" onClick={addCreditInput}>
					+
				</button>
				<textarea name="credit" id="" cols="30" rows="10" value={JSON.stringify(creditProcessor(credits))} />
			</>
		);
	};
	return (
		<>
			<MetaProvider>
				<Title>Dev Edit Song</Title>
			</MetaProvider>
			<Switch>
				<Match when={song_data.loading}>
					<div>少女祈祷中……</div>
				</Match>
				<Match when={song_data() == 0 && useParams().id}>
					<div>Song Not Found</div>
					<a href="/dev/edit/release">前去新增曲目</a>
				</Match>
				<Match when={song_data() !== 0}>
					<form action="http://127.0.0.1:3007/dev/edit/song" method="post" target="_blank">
						<h2>编辑曲目</h2>
						<input type="hidden" name="id" value={song_data()[0]?.id} />
						<div>
							<h4 for="name">标题</h4>
							<input type="text" name="title" value={song_data()[0]?.title} required />
						</div>
						<div>
							<h4>歌曲艺术家</h4>
							<input type="text" name="artist" value={song_data()[0]?.artist} />
						</div>
						<div>
							<h4>时长</h4>
							<input type="time" name="duration" value={song_data()[0]?.duration} />
						</div>
						<div>
							<h4>制作人员名单</h4>
							{/* CSS TODO */}
							<div style={{display: "flex"}}>
								<EditCredits />
							</div>
						</div>
						<div>
							<h4>歌词</h4>
							<textarea name="lyrics" id="" cols="30" rows="10" />
						</div>
						<div>
							<h4>ncm id</h4>
							<input type="number" name="ncm_id" value={song_data()[0]?.ncm_id} />
						</div>
						<button type="submit">提交</button>
					</form>
					<div style={{width: "100%", height: "200px"}} />
				</Match>
				<Match when={song_data.error}>
					<div>好像出现了异变……</div>
					<div>{JSON.stringify(song_data.error)}</div>
				</Match>
			</Switch>
		</>
	);
};

export default DevEditSong;
