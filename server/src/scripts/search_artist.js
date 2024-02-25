// 在html文件中引用
/* global debounce, fetchData, global_delay */

// const { debounce, global_delay } = require("./little_tools.js");

const artist_result_container = document.getElementById("artist_result_container");
const search_credit_artist_input = document.getElementById("search_credit_artist_input");
// 搜索署名艺术家并更新结果
/**
 * {@link require:little_tools.js}
 * @requires "little_tools.js" */
async function searchCreditArtist() {
	let value = search_credit_artist_input.value ? search_credit_artist_input.value : [];
	// 文本需要两个字符触发搜索
	if ((!isNaN(value) && value.length > 0) || (isNaN(value) && value.length > 1)) {
		let data = await fetchData("artist", "name, id", "keyword", value);
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
// function addCreditArtist(artist, name) {
// 	artist_count++;
// 	let id_str = artist ? artist.id : "";
// 	let artist_name_str = name ? name : "";
// 	const artist_row = document.createElement("div");
// 	artist_row.id = `artist${artist_count}`;
// 	const id_input = document.querySelectorAll(".id_input");
// 	artist_row.className = `artist_name_container`;
// 	artist_row.draggable = true;
// 	artist_row.innerHTML = `
// 		<input value="${id_str}" class="id_input" placeholder="Enter artist ID here" type"text" onchange="this.value = replaceWithRegExp(/[^0-9]/g, '', this.value)"  />
// 		<button onclick="removeElementByID('artist${artist_count}')">移除</button>
// 		<div class="artist_name_div">${artist_name_str}</div>`;
// 	let input_id_array = [];
// 	for (let i = 0; i < id_input.length; i++) {
// 		input_id_array.push(Number(id_input[i].value));
// 	}
// 	// 最多五个
// 	if (!input_id_array.includes(id_str) && document.getElementsByClassName("artist_name_container").length < 5) {
// 		document.getElementById("credit_artist").appendChild(artist_row);
// 	}
// }
// bak
function addCreditArtist(artist, name) {
	artist_count++;
	let id_str = artist ? artist.id : "";
	let artist_name_str = name ? name : "";
	const artist_row = document.createElement("div");
	artist_row.id = `artist${artist_count}`;
	const id_input = document.querySelectorAll(".id_input");
	artist_row.className = `artist_name_container`;
	artist_row.draggable = true;
	artist_row.innerHTML = `
		<input value="${id_str}" class="id_input" placeholder="Enter artist ID here" type"text" onchange="this.value = replaceWithRegExp(/[^0-9]/g, '', this.value)"  />
		<button onclick="removeElementByID('artist${artist_count}')">移除</button>
		<div class="artist_name_div">${artist_name_str}</div>`;
	let input_id_array = [];
	for (let i = 0; i < id_input.length; i++) {
		input_id_array.push(Number(id_input[i].value));
	}
	// 最多五个
	if (!input_id_array.includes(id_str) && document.getElementsByClassName("artist_name_container").length < 5) {
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

// 监听发行艺术家输入事件
const credit_artist = document.getElementById("credit_artist");
credit_artist.addEventListener(
	"input",
	debounce(async function (event) {
		try {
			// 显示艺术家名称
			const artist_input_value = event.target.value;
			const artist_name_element = event.target.	.nextElementSibling;
			// 输入为空则清空
			if (artist_input_value == "") {
				artist_name_element.textContent = ``;
			} else {
				let data = await fetchData("artist", "name", "id", artist_input_value);
				let artist_name = data.length !== 0 ? data[0].name : "Artist not found";
				artist_name_element.textContent = `${artist_name}`;
			}
		} catch (error) {
			console.error("Error while fetching artist name:", error);
		}
	}, global_delay),
);

const observer = new MutationObserver(() => {
	const default_album_credit_name = document.getElementById("default_album_credit_name_label");
	const artist_name_div = document.getElementsByClassName("artist_name_div");
	let credit_artist_name = [];
	for (let i = 0; i < artist_name_div.length; i++) {
		credit_artist_name.push(artist_name_div[i].textContent);
	}
	credit_artist_name = credit_artist_name.filter((value) => value != "");
	credit_artist_name = credit_artist_name.join(`<input class="separator"/>`);
	default_album_credit_name.innerHTML = "Deafult: " + credit_artist_name;
});

observer.observe(credit_artist, {
	attributes: true,
	childList: true,
	subtree: true,
});
