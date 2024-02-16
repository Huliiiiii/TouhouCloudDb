// 在html文件中引用
/* global debounce, global_delay */
// const { debounce, global_delay } = require("./little_tools.js");
async function fetchArtistByKeyword(keyword, column) {
	try {
		const response = await fetch(`/api/search/artist?target=${column}&keyword=${encodeURIComponent(keyword)}`);
		if (!response.ok) {
			throw new Error("Invalid request");
		} else {
			const data = await response.json();
			return data;
		}
	} catch (error) {
		console.error("Error while fetching artist data:", error);
		return null;
	}
}
async function fetchArtistByID(id, column) {
	try {
		const response = await fetch(`/api/search/artist?target=${column}&id=${encodeURIComponent(id)}`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error while fetching artist data:", error);
	}
}

const artist_result_container = document.getElementById("artist_result_container");
const search_credit_artist_input = document.getElementById("search_credit_artist_input");
// 搜索署名艺术家并更新结果
async function searchCreditArtist() {
	let value = search_credit_artist_input.value ? search_credit_artist_input.value : [];
	// 文本需要两个字符触发搜索
	if ((!isNaN(value) && value.length > 0) || (isNaN(value) && value.length > 1)) {
		let [data1] = await fetchArtistByKeyword(value, "name");
		let [data2] = await fetchArtistByKeyword(value, "artist_id");
		let data = Object.assign(data1, data2);
		data = [data];
		console.log(data);
		updateArtistResult(data, artist_result_container);
	} else {
		artist_result_container.innerHTML = "";
	}
}

function updateArtistResult(data, result_container) {
	// reset
	result_container.innerHTML = "";
	// if not found
	if (data.length === 0) {
		result_container.appendChild(document.createElement("div")).innerHTML = "Artist not found";
	}
	// generate and update page
	else {
		data.forEach((artist) => {
			const artist_result = document.createElement("div");
			artist_result.innerHTML = artist.name;
			artist_result.onclick = () => addCreditArtist(artist, artist.name);
			result_container.appendChild(artist_result);
		});
	}
}

// 发行署名
let artist_count = 0;
function addCreditArtist(artist, name) {
	artist_count++;
	let artist_id_str = artist ? artist.artist_id : "";
	let artist_name_str = name ? name : "";
	const artist_row = document.createElement("div");
	artist_row.id = `artist${artist_count}`;
	artist_row.className = `artist_name_container`;
	artist_row.draggable = true;
	artist_row.innerHTML = `
		<input value="${artist_id_str}" class="artist_id_input" placeholder="Enter artist ID here" type"text" onchange="this.value = replaceWithRegExp(/[^0-9]/g, '', this.value)"  />
		<button onclick="removeElementByID('artist${artist_count}')">移除</button>
		<div>${artist_name_str}</div>`;
	const artist_id_input = document.getElementsByClassName("artist_id_input");
	let input_id_array = [];
	for (let i = 0; i < artist_id_input.length; i++) {
		input_id_array.push(Number(artist_id_input[i].value));
	}
	// 最多五个
	if (!input_id_array.includes(artist_id_str) && document.getElementsByClassName("artist_name_container").length < 5) {
		document.getElementById("credit_artist").appendChild(artist_row);
	}
}

document.addEventListener("input", async function (event) {
	if (event.target === search_credit_artist_input) {
		debounce(searchCreditArtist, global_delay)();
	}
});

const clear_search_credit_artist = document.getElementById("clear_search_credit_artist");
document.addEventListener("click", function (event) {
	if (event.target === clear_search_credit_artist) {
		search_credit_artist_input.value = "";
		artist_result_container.innerHTML = "";
	}
});

// 监听署名艺术家输入事件
const credit_artist = document.getElementById("credit_artist");
credit_artist.addEventListener(
	"input",
	debounce(async function (event) {
		try {
			const value = event.target.value;
			const element = event.target.nextElementSibling.nextElementSibling;
			// 输入为空则清空
			if (value == "") {
				element.textContent = ``;
			}
			// 不是数字
			if (isNaN(value)) {
				throw new Error("ID must be a number");
			}
			let data = await fetchArtistByID(value, "*");
			console.log(data);
			let artist_name = data.length !== 0 ? data[0].name : "Artist not found";
			element.textContent = `${artist_name}`;
		} catch (error) {
			console.error("Error while fetching artist name:", error);
		}
	}, global_delay),
);
