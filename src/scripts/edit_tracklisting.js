/* eslint-disable no-unused-vars */
// 在html文件中引用
/* global debounce */
// const { debounce } = require("./little_tools.js");
let track_count = 0;

function removeElementByID(id) {
	document.getElementById(id).remove();
}

function removeElementByClassName(class_name) {
	document.getElementsByClassName(class_name).remove();
}
/**
 * @param {String} target_type - artist, song, release
 * @param {String} target - 想要获取的字段类型
 * @param {String} value_type - keyword or id
 * @param {String | Number} value
 * @return {JSON | Error}
 */
async function fetchData(target_type, target, value_type, value) {
	try {
		const response = await fetch(`/api/search/${target_type}?target=${target}&${value_type}=${encodeURIComponent(value)}`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(`Error while fetching ${target_type} data:`, error);
	}
}

// 获取曲目标题和ID
const song_result_container = document.getElementById("song_result_container");
const search_track_listing_input = document.getElementById("search_track_listing_input");
async function searchTrackListingSong() {
	let value = search_track_listing_input.value ? search_track_listing_input.value : [];
	// 文本需要两个字符触发搜索
	if ((!isNaN(value) && value.length > 0) || (isNaN(value) && value.length > 1)) {
		let [data1, a] = await fetchData("song", "title", "keyword", value);
		let [data2, b] = await fetchData("song", "song_id", "keyword", value);
		let data = Object.assign(data1, data2);
		data = [data];
		updateSongResult(data, song_result_container);
	} else {
		song_result_container.innerHTML = "";
	}
}
function addTrack(song, title) {
	track_count++;
	let song_id = song ? song.song_id : "";
	let track_title = title ? title : "";
	//
	const track_row = document.createElement("tr");
	track_row.className = `song_title_container track${track_count}`;
	track_row.id = `track${track_count}`;
	track_row.draggable = true;
	track_row.style = "display: flex; flex-wrap: wrap; margin: 5px 5px 5px 5px;";
	track_row.innerHTML = `
		<tr>
			<td style="width: 10%;"><input name="track_num" ></td>
			<td style="width: 50%;"><input name="track_id" value="${song_id}" placeholder="Only for Song ID" onchange="this.value = replaceWithRegExp(/[^0-9]/g, '', this.value)" style="width: 100%;"></td>
			<td style="width: 14%;"><input name="track_length" style="width: 100%;"/></td>
			<td style="width: 16%;"><button onclick="removeElementByID('track${track_count}')" style="width: 100%;">移除</button></td>
			<div>title(todo)${track_title}</div>
		</tr>`;
	let input_id_array = [];
	let track_id_input = document.getElementsByName("track_id");
	for (let i = 0; i < track_id_input.length; i++) {
		input_id_array.push(Number(track_id_input[i].value));
	}

	// 曲目数量限制: 30
	if (!input_id_array.includes(song_id) && document.getElementsByClassName("song_title_container").length < 30) {
		document.getElementById("track_listing").appendChild(track_row);
	}
}

function updateSongResult(data, result_container) {
	// reset
	result_container.innerHTML = "";
	// if not found
	if (data.length === 0) {
		result_container.appendChild(document.createElement("div")).innerHTML = "Song not found";
	}
	// generate and update page
	else {
		data.forEach((song) => {
			const track = document.createElement("div");
			track.innerHTML = song.title;
			track.onclick = () => addTrack(song, track.title);
			result_container.appendChild(track);
		});
	}
}

document.addEventListener("input", async function (event) {
	if (event.target === search_track_listing_input) {
		debounce(searchTrackListingSong, global_delay)();
	}
});
