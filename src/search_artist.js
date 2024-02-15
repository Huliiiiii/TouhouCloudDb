// let album_artist_input = document.getElementById("album_artist_input");
const global_delay = 700;

function debounce(func, wait) {
	let timer;
	return function (...args) {
		const later = () => {
			timer = null;
			func(...args);
		};
		clearTimeout(timer);
		timer = setTimeout(later, wait);
	};
}
async function fetchArtistByKeyword(keyword) {
	try {
		const response = await fetch(`/api/search_artist?keyword=${encodeURIComponent(keyword)}`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error while fetching artist data:", error);
		return null;
	}
}
async function fetchArtistByID(id) {
	try {
		const response = await fetch(`/api/search_artist?id=${encodeURIComponent(id)}`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error while fetching artist data:", error);
		return null;
	}
}

const artist_result_container = document.getElementById("artist_result_container");
const search_credit_artist_input = document.getElementById("search_credit_artist_input");
async function searchArtist() {
	let search_value = search_credit_artist_input.value;
	if (search_value !== "") {
		let data = await fetchArtistByKeyword(search_value);
		updateArtistResult(data, artist_result_container);
	} else {
		artist_result_container.innerHTML = "";
	}
}
function updateArtistResult(data, resultContainer) {
	resultContainer.innerHTML = "";
	if (data.length === 0) {
		resultContainer.appendChild(document.createElement("div")).innerHTML = "Artist not found";
	} else {
		data.forEach((artist) => {
			const artist_result = document.createElement("div");
			artist_result.innerHTML = artist.name;
			artist_result.onclick = () => addCreditArtist(artist, artist.name);
			resultContainer.appendChild(artist_result);
		});
	}
}

// 增减署名艺术家函数
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
		<tr>
			<td><input value="${artist_id_str}" class="artist_id_input" placeholder="Enter artist ID here" type="number"/></td>
			<td>
				<button onclick="removeElementByID('artist${artist_count}')">
					删除
				</button>
			</td>
		</tr>
		<div>${artist_name_str}</div>`;
	const artist_id_input = document.getElementsByClassName("artist_id_input");
	let input_id_array = [];
	for (let i = 0; i < artist_id_input.length; i++) {
		input_id_array.push(Number(artist_id_input[i].value));
	}
	if (!input_id_array.includes(artist_id_str)) {
		document.getElementById("credit_artist").appendChild(artist_row);
	}
}

document.addEventListener("input", async function (event) {
	if (event.target === search_credit_artist_input) {
		debounce(searchArtist, global_delay)();
	}
});

const clear_search_credit_artist = document.getElementById("clear_search_credit_artist");
document.addEventListener("click", function (event) {
	if (event.target === clear_search_credit_artist) {
		search_credit_artist_input.value = "";
		artist_result_container.innerHTML = "";
	}
});

const credit_artist = document.getElementById("credit_artist");
credit_artist.addEventListener(
	"input",
	debounce(async function (event) {
		const artist_id = event.target.value;
		const artistNameElement = event.target.nextElementSibling.nextElementSibling;
		try {
			if (artist_id == "") {
				artistNameElement.textContent = ``;
			}
			let artist_result = await fetchArtistByID(artist_id);
			let artist_name = artist_result.length !== 0 ? artist_result[0].name : "Artist not found";
			artistNameElement.textContent = `${artist_name}`;
		} catch (error) {
			console.error("Error fetching artist name:", error);
		}
	}, global_delay),
);
