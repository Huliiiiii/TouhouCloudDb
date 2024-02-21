import {Index, createResource, createSignal, Show} from "solid-js";

const [Page, setPage] = createSignal(1);
const [Pn, setPn] = createSignal(10);
const fetchSongList = async () => {
	const res = await fetch(`http://127.0.0.1:3007/api/search/song?type=list&page=${Page()}&pn=${Pn()}`);
	return res.json();
};
const [data, {refetch}] = createResource(fetchSongList);
function pageUp(number) {
	setPage(Page() + number);
	refetch();
}
function pageDown(number) {
	setPage(Page() - number);
	refetch();
}
function pageReset() {
	setPage(1);
	refetch();
}
function changePn(value) {
	setPn(value);
	refetch();
}

function SongList() {
	return (
		<div>
			<div>
				<label for="pn">单页显示条目数量: </label>
				<select name="pn" id="pn" onChange={(e) => changePn(e.currentTarget.value)}>
					<option value="10" selected>
						10
					</option>
					<option value="25">25</option>
					<option value="50">50</option>
					<option value="100">100</option>
				</select>
			</div>
			<Index each={data()}>
				{(song) => (
					<>
						{/* CSS TODO */}
						<div style={{display: "flex", "justify-content": "space-between"}}>
							<div>
								<a href={"/song/" + song().id}>{song().title}</a>
							</div>
							<div style={{width: "100px"}} />
							<div>
								<a href={"/dev/edit/song/" + song().id}> edit</a>
							</div>
						</div>
					</>
				)}
			</Index>
			{/* CSS TODO */}
			<div style={{display: "flex", "justify-content": "space-between"}}>
				<Show
					when={Page() > 1}
					fallback={
						<>
							<button disabled>--</button>
							<button disabled>-</button>
						</>
					}
				>
					<button onClick={() => pageReset()}>--</button>
					<button onClick={() => pageDown(1)}>-</button>
				</Show>
				<div>Page: {Page()}</div>
				<button onClick={() => pageUp(1)}>+</button>
				<button onClick={() => pageUp(10)}>++</button>
			</div>
		</div>
	);
}

export default SongList;
