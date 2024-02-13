let btn = document.getElementById("search_credit_artist_btn");
var search_input = document.getElementById("search_credit_artist");
var result_container = document.getElementById("artist_result");

btn.addEventListener(
	"click",
	function (event) {
		event.preventDefault();
		var search_value = search_input.value;
		fetch(`http://127.0.0.1:3007/api/search_artist?keyword=${encodeURIComponent(search_value)}`)
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error("Network response was not ok");
				}
			})
			.then((data) => updatePageWithSearchResults(data, result_container))
			.catch((error) => console.error("Error occurred while searching artist", error));
	},
	300,
);

function updatePageWithSearchResults(data, result_container) {
	result_container.innerHTML = "";
	if (data == 0) {
		result_container.appendChild(document.createElement("p")).innerHTML = "Artist not found";
	} else {
		for (let i = 0; i < data.length; i++) {
			const div = document.createElement("div");
			div.innerHTML = data[i].name;
			div.onclick = function () {
				var value_to_insert = data[i].artist_id + ", ";
				document.getElementById("album_artist_input").value += value_to_insert;
			};
			result_container.appendChild(div);
		}
	}
}
