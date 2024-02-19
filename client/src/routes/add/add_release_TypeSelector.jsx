import {createSignal, For} from "solid-js";

const options = ["Album", "EP", "Single", "Compilation", "Others"];

function TypeSelector() {
	const [selected, setSelected] = createSignal("");

	return (
		<>
			<h4>发行类型</h4>
			<select value={selected()} id="release_type" onInput={(e) => setSelected(e.currentTarget.value)}>
				<option value="">--请选择--</option>
				<For each={options}>{(type) => <option value={type}>{type}</option>}</For>
			</select>
		</>
	);
}
export default TypeSelector;
