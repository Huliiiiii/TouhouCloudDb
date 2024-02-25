import {For, createSignal, onMount, createResource} from "solid-js";
import {createStore} from "solid-js/store";
import {fetchData} from "./fetch_data_functions";
import {forEach, clone} from "ramda";
import {debounce} from "lodash";
import {fetchArtistByKeyword} from "./fetch_data_functions";

interface credits {
	artist_id: string | number;
	artist_name: string;
	override_credit_name: string;
	role: string | number;
}
interface processed_credits {
	artist_id: string | number;
	artist_name?: string;
	override_credit_name?: string;
	role: string | number;
}
declare module "solid-js" {
	namespace JSX {
		interface Directives {
			updateArtistResult: boolean;
		}
	}
}
export default function EditCredits(props: any) {
	/* TODO:
		1. input时修改数据
		2. 只有在需要时显示化名input
		3. music role相关的搜索，插入，更新逻辑
	*/
	// 初始化数据
	// TODO: 让这个函数只搜索一次

	const [credits, setCredits] = createStore<Array<credits>>([]);
	onMount(async () => {
		const song_data = props.song_data;
		let new_arr = [];

		// for (let credit of song_data.credits) {
		// 	const [artist_data] = await fetchData("artist", "id", credit.artist_id);
		// 	credit = Object.assign(credit, {artist_name: artist_data.name});
		// 	new_arr.push(credit);
		// }
		// setCredits([...credits, ...new_arr]);
		song_data.credits.forEach((credit) => {
			new_arr.push(credit.artist_id);
		});
		const all_artist = Object.assign(song_data.artist, new_arr);
		const artist_data = await fetchData("artist", "id", all_artist);
		let artistIdToNameMap = {};
		artist_data.forEach((artistInfo) => {
			artistIdToNameMap[artistInfo.id] = artistInfo.name;
		});
		// 遍历对象数组，插入相应的 artist name
		song_data.credits.forEach((obj) => {
			const artistId = obj.artist_id;
			if (artistIdToNameMap[artistId]) {
				obj.artist_name = artistIdToNameMap[artistId];
			}
		});
		setCredits([...credits, ...song_data.credits]);
		// 打印结果
		console.log(song_data.credits);
	});

	// 修改数据函数
	function addCreditInput(artist: any) {
		if (!credits.some((credit) => credit.artist_id === artist.id)) {
			setCredits([
				...credits,
				{
					artist_id: artist.id,
					artist_name: artist.name,
					override_credit_name: "",
					role: ""
				}
			]);
		} else {
			alert("Artist already in credits");
		}
	}
	const removeCreditInput = (credit: credits) => {
		const idx = credits.indexOf(credit);
		setCredits((c) => [...c.slice(0, idx), ...c.slice(idx + 1)]);
	};

	const [getArtistInput, setArtistInput] = createSignal("");
	const [artist_result, {refetch}] = createResource(getArtistInput, fetchArtistByKeyword);

	true && updateArtistResult;
	function updateArtistResult(el: HTMLInputElement) {
		const func1 = async () => {
			setArtistInput(el.value);
			refetch();
		};
		el.addEventListener("input", debounce(func1, 400));
	}

	// 后期处理
	function creditProcessor(input: credits[]) {
		const input_copy = clone(input);
		const processed_credits = forEach((obj: processed_credits) => {
			delete obj.artist_name;
			if (obj.override_credit_name === "") delete obj.override_credit_name;
		}, input_copy);
		return processed_credits;
	}
	return (
		<>
			<div>
				<table style={{display: "flex"}}>
					<tbody>
						<tr>
							<td>Name</td>
							<td>化名</td>
							<td>职责</td>
						</tr>
						<For each={credits}>
							{function (credit: credits, index) {
								const {artist_name, override_credit_name, role} = credit;
								return (
									<tr>
										<td>
											<input type="text" value={artist_name} disabled />
										</td>
										<td>
											<input
												type="text"
												value={override_credit_name || ""}
												onInput={(e) => setCredits(index(), "override_credit_name", e.currentTarget.value)}
											/>
										</td>
										<td>
											<input type="text" value={role} onInput={(e) => setCredits(index(), "role", e.currentTarget.value)} required />
										</td>
										<td>
											<button onClick={[removeCreditInput, credit]}>remove</button>
										</td>
									</tr>
								);
							}}
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
									<td style={{border: "1px solid black"}} onClick={[addCreditInput, artist]}>
										{artist.name}
									</td>
								</tr>
							)}
						</For>
					</tbody>
				</table>
			</div>
			<div>
				{/* 实际发送到服务器的数据 hidden*/}
				<div>实际发送到服务器的数据</div>
				<textarea name="credits" id="" cols="30" rows="10" value={JSON.stringify(creditProcessor(credits))} />
			</div>
		</>
	);
}
