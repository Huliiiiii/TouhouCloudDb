import { createResource, createSignal } from "solid-js";
import { For } from "solid-js/web";
import { fetchArtistByKeyword } from "../routes/dev/fetch_data_functions";
import { debounce } from "lodash";

declare module "solid-js" {
	namespace JSX {
		interface Directives {
			updateResult: true;
		}
	}
}

export default function (props: { label: string; addInput: (input: any) => void }) {
	const [getArtistInput, setArtistInput] = createSignal("");
	const [artist_result, { refetch }] = createResource(getArtistInput, fetchArtistByKeyword);
	const [getInputLock, setInputLock] = createSignal<boolean>(false);
	// TODO: 搞清楚这个不报错
	true && updateResult;
	function updateResult(el: HTMLInputElement) {
		el.addEventListener("compositionstart", () => setInputLock(true));
		el.addEventListener("compositionend", () => setInputLock(false));
		// el.addEventListener("input", debounce(func1, 400));
		el.addEventListener(
			"input",
			debounce(() => {
				if (getInputLock() === true) return;
				else {
					if (isNaN(Number(el.value)) && el.value.length >= 2) {
						setArtistInput(el.value);
						refetch();
					} else if (!isNaN(Number(el.value))) {
						setArtistInput(el.value);
						refetch();
					}
					refetch();
				}
			}, 400)
		);
	}
	return (
		<>
			<tbody>
				<tr>
					<td>{props.label || "测试"}</td>
				</tr>
				<tr>
					<td>
						<input type="text" use:updateResult />
					</td>
				</tr>
				<For each={artist_result()}>
					{(artist) => (
						<tr>
							<td style={{ border: "1px solid black" }} onClick={[props.addInput, artist]}>
								{artist.name}
							</td>
						</tr>
					)}
				</For>
			</tbody>
		</>
	);
}
