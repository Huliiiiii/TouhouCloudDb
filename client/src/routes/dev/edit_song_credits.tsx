import { For, createSignal, onMount, createResource, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { fetchData } from "./fetch_data_functions";
import { forEach, clone } from "ramda";
import { debounce } from "lodash";
import { fetchArtistByKeyword } from "./fetch_data_functions";

interface artist_data {
	id: string;
	name: string;
}
interface credits {
	artist_id: string | number;
	artist_name: string;
	override_credit_name?: string;
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
		3. music role相关的搜索，插入，更新逻辑
		4. 搜索框两个非数字时两个字符以上才会触发搜索
		5. 艺术家排序拖拽
	*/
	// 初始化数据
	// TODO: 减少额外的搜索
	const [credits, setCredits] = createStore<Array<credits>>([]);
	onMount(async () => {
		const song_data = props.song_data;
		let new_arr = [];
		for (let credit of song_data.credits) {
			const [artist_data]: artist_data[] = await fetchData("artist", "id", credit.artist_id);
			credit = Object.assign(credit, {
				artist_name: artist_data?.name,
				override_credit_name: credit.override_credit_name || undefined
			});
			new_arr.push(credit);
		}
		setCredits([...credits, ...new_arr]);

		// song_data.credits.forEach((credit) => {
		// 	new_arr.push(credit.artist_id);
		// });

		// const all_artist = Object.assign(song_data.artist, new_arr);
		// const artist_data = await fetchData("artist", "id", all_artist);
		// let artistIdToNameMap = {};
		// artist_data.forEach((artistInfo) => {
		// 	artistIdToNameMap[artistInfo.id] = artistInfo.name;
		// });
		// // 遍历对象数组，插入相应的 artist name
		// song_data.credits.forEach((obj) => {
		// 	const artistId = obj.artist_id;
		// 	if (artistIdToNameMap[artistId]) {
		// 		obj.artist_name = artistIdToNameMap[artistId];
		// 	}
		// });
		// setCredits([...credits, ...song_data.credits]);
		// 打印结果
		// console.log(song_data.credits);
	});

	// 修改数据函数
	function addCreditInput(artist: artist_data) {
		if (!credits.some((credit) => credit.artist_id === artist.id)) {
			setCredits([
				...credits,
				{
					artist_id: artist.id,
					artist_name: artist.name,
					override_credit_name: undefined,
					role: ""
				}
			]);
		} else {
			alert("Artist already in credits");
		}
	}
	const removeCreditInput = (credit: credits) => {
		// const idx = credits.indexOf(credit);
		// setCredits((c) => [...c.slice(0, idx), ...c.slice(idx + 1)]);
		setCredits(credits.filter((item) => item !== credit));
	};

	const [getArtistInput, setArtistInput] = createSignal("");
	const [artist_result, { refetch }] = createResource(getArtistInput, fetchArtistByKeyword);

	true && updateArtistResult;
	function updateArtistResult(el: HTMLInputElement) {
		const func1 = async () => {
			if (isNaN(Number(el.value)) && el.value.length >= 2) {
				setArtistInput(el.value);
				refetch();
			} else if (!isNaN(Number(el.value))) {
				setArtistInput(el.value);
				refetch();
			}
		};
		el.addEventListener("input", debounce(func1, 450));
	}
	// OCN(override credit name) Button
	const switch_OCN = (idx: number) => {
		if (credits[idx]?.override_credit_name === undefined)
			setCredits(idx, "override_credit_name", "");
		else if (credits[idx]?.override_credit_name !== undefined)
			setCredits(idx, "override_credit_name", undefined);
	};

	// 后期处理
	function creditProcessor(input: credits[]) {
		const input_copy = clone(input);
		const processed_credits = forEach((obj: processed_credits) => {
			delete obj.artist_name;
			if (obj.override_credit_name === "") delete obj.override_credit_name;
		}, input_copy);
		return JSON.stringify(processed_credits);
	}
	return (
		<>
			<div>
				<table style={{ display: "flex" }}>
					<tbody>
						<tr>
							<td>Name</td>
							<td>职责</td>
						</tr>
						<For each={credits}>
							{(credit: credits, index) => (
								<>
									<tr>
										<td>
											<input type="text" value={credit.artist_name} disabled />
										</td>

										<td>
											<input
												type="text"
												value={credit.role}
												onInput={(e) => setCredits(index(), "role", e.currentTarget.value)}
												required
											/>
										</td>
										<td>
											<button type="button" onClick={[removeCreditInput, credit]}>
												remove
											</button>
										</td>
									</tr>
									<tr>
										<td>
											<button type="button" onClick={[switch_OCN, index()]}>
												<Show
													when={credit.override_credit_name !== undefined}
													fallback={"添加化名"}
												>
													移除化名
												</Show>
											</button>
										</td>
										<Show when={credit.override_credit_name !== undefined}>
											<td>
												<input
													type="text"
													value={credit.override_credit_name}
													onInput={(e) =>
														setCredits(index(), "override_credit_name", e.currentTarget.value)
													}
												/>
											</td>
										</Show>
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
									<td style={{ border: "1px solid black" }} onClick={[addCreditInput, artist]}>
										{artist.name}
									</td>
								</tr>
							)}
						</For>
					</tbody>
				</table>
			</div>
			<div>
				<div>网站背后的数据 Dev Only</div>
				<textarea name="credits" id="" cols="30" rows="10" value={JSON.stringify(credits)} />
				{/* 实际发送到服务器的数据 hidden*/}
				<div>实际发送到服务器的数据</div>
				<textarea name="credits" id="" cols="30" rows="10" value={creditProcessor(credits)} />
			</div>
		</>
	);
}
