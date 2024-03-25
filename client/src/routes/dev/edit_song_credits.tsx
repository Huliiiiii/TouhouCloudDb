import { clone, forEach } from "ramda";
import { For, Show, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import { artist_data, song_data } from "types/types";
import AddArtistCompoment from "../../compoments/edit_page_search_artist";
import { fetchData } from "./fetch_data_functions";

type credits = {
	artist_id: string | number;
	artist_name?: string;
	override_credit_name?: string | undefined;
	role: string | number;
};

declare module "solid-js" {
	namespace JSX {
		interface Directives {
			updateArtistResult: boolean;
		}
	}
}
export default function EditCredits(props: { song_data: song_data }) {
	/* TODO:
		3. music role相关的搜索，插入，更新逻辑
		4. 搜索框两个非数字时两个字符以上才会触发搜索
		5. 艺术家排序拖拽
	*/
	// 初始化数据
	// TODO: 减少额外的搜索
	const [credits, setCredits] = createStore<credits[]>([]);
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
		const processed_credits = forEach((obj: credits) => {
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
											<input type="text" value={credit.artist_name || ""} disabled />
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
													value={credit.override_credit_name || ""}
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
					<AddArtistCompoment label="Add Credit Input" addInput={addCreditInput} />
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
