/* eslint-disable no-unused-vars */
// 在html文件中引用
/* global debounce, fetchData, global_delay*/
// const { debounce, fetchData } = require("./little_tools.js");
let track_count = 0;

function removeElementByID(id) {
	document.getElementById(id).remove();
}

function removeElementByClassName(class_name) {
	document.getElementsByClassName(class_name).remove();
}

// 获取曲目标题和ID
const song_result_container = document.getElementById("song_result_container");
const search_track_listing_input = document.getElementById("search_track_listing_input");
async function searchTrackListingSong() {
	let value = search_track_listing_input.value ? search_track_listing_input.value : [];
	// 文本需要两个字符触发搜索
	if ((!isNaN(value) && value.length > 0) || (isNaN(value) && value.length > 1)) {
		let [data] = await fetchData("song", "song_id, title", "keyword", value);
		data = [data];
		updateSongResult(data, song_result_container);
	} else {
		song_result_container.innerHTML = "";
	}
}
function addTrack(song, title) {
	track_count++;
	let song_id = song ? song.song_id : "";
	let track_title = title ? song.title : "";
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
			<div>${track_title}</div>
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
			track.onclick = () => addTrack(song, song.title);
			result_container.appendChild(track);
		});
	}
}

document.addEventListener("input", async function (event) {
	if (event.target === search_track_listing_input) {
		debounce(searchTrackListingSong, global_delay)();
	}
});
