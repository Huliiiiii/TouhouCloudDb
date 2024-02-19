import {Dynamic} from "solid-js/web";
import {createSignal, For} from "solid-js";

// 这里其实可以用一组对象和数组生成input，后面修改时的工作量能小些，但是我懒得写了（
const CD_Attributes = () => (
	<>
		<input type="radio" name="CD_Attributes" id="CD_Attributes_Default" checked />
		<label for="CD_Attributes_Default">CD</label>
		<input type="radio" name="CD_Attributes" id="CD_Attributes_CD_R" />
		<label for="CD_Attributes_CD_R">CD-R</label>
	</>
);
const Digital_Attributes = () => (
	<>
		<input type="radio" name="Digital_Attributes" id="Digital_Attributes_Streaming" checked />
		<label for="Digital_Attributes_Streaming">Streaming</label>
		<input type="radio" name="Digital_Attributes" id="Digital_Attributes_Downloaded" />
		<label for="Digital_Attributes_Downloaded">Downloaded</label>
	</>
);
const Vinly_Size = function () {
	const size = [`12"`, `10"`, `7"`, `5"`, `3"`];
	const name = "Vinyl_Size";
	const Others = size.map(function (size) {
		return (
			<>
				<input type="radio" name={name} id={name + "_" + size} value={size} />
				<label for={name + "_" + size}>{size}</label>
			</>
		);
	});
	return (
		<>
			<input type="radio" name={name} id="Vinyl_Size_Default" checked />
			<label for="Vinyl_Size_Default">Vinyl</label>
			{Others}
		</>
	);
};
// 真的需要DVD吗
const DVD_Attributes = () => (
	<>
		<input type="hidden" name="DVD_Attributes" id="DVD_Attributes_Default" checked />
	</>
);

const formats = {
	CD: CD_Attributes,
	Digital: Digital_Attributes,
	Vinyl: Vinly_Size,
	DVD: DVD_Attributes
};

function FormatSelector() {
	const [selected, setSelected] = createSignal("");
	return (
		<>
			<h4>发行介质</h4>
			<select value={selected()} id="release_format" onInput={(e) => setSelected(e.currentTarget.value)}>
				<option value="">--请选择--</option>
				<For each={Object.keys(formats)}>{(format) => <option value={format}>{format}</option>}</For>
			</select>
			<Dynamic component={formats[selected()]} />
		</>
	);
}
export default FormatSelector;
