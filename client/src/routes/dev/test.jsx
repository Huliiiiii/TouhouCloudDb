import {MetaProvider, Title} from "@solidjs/meta";
import {useParams} from "@solidjs/router";
import {createResource, Switch, Match, For} from "solid-js";
import {createStore} from "solid-js/store";
const fetchSong = async () => {
	const res = await fetch(`http://127.0.0.1:3007/api/search/song?id=${useParams().id}`);
	return res.json();
};

let credit_count = 0;

const DevEditSong = function () {
	const [song_data] = createResource(fetchSong);
	const [credits, setCredits] = createStore([]);
	const EditCredits = () => {
		createEffect(() => {
			for (let i = 0; i < Object.keys(song_data().credits).length; i++) {
				setCredits([
					...credits,
					{count: credit_count++, credit_artist_id: Object.keys(song_data().credits)[i], credit_role: Object.values(song_data().credits)[i]}
				]);
			}
		});

		const addCreditInput = () => {
			setCredits([
				...credits,
				{
					count: credit_count++
				}
			]);
		};
		function removeCreditInput(count) {
			setCredits(credits.filter((credit) => credit.count !== count));
		}
		return (
			<>
				<div>
					<For each={credits}>
						{(credit, i) => (
							<>
								<ul>
									<p>{i()}</p>
									<input
										type="text"
										name="credit_artist_id"
										value={credit.credit_artist_id}
										onInput={(e) => setCredits(i(), "credit_artist_id", e.currentTarget.value)}
										size="5"
										required
									/>
									<input
										type="text"
										name="credit_role"
										value={credit.credit_role}
										onInput={(e) => setCredits(i(), "credit_role", e.currentTarget.value)}
										size="5"
										required
									/>
									<button onClick={() => removeCreditInput(credit.count)}>-</button>
								</ul>
							</>
						)}
					</For>
					<textarea name="credit_preview" id="" cols="30" rows="10" value={JSON.stringify(credits)} />
				</div>
				<button type="button" onClick={addCreditInput}>
					+
				</button>
				<textarea name="credit_preview" cols="30" rows="10" value={JSON.stringify(credits)} disabled />
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
				</Match>
			</Switch>
		</>
	);
};

export default DevEditSong;
