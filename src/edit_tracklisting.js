/* eslint-disable no-unused-vars */
let count = 0;

function addTrack() {
	count++;
	const trackRow = document.createElement("tr");
	trackRow.id = `track${count}`;
	trackRow.innerHTML = `
        <td><input></td>
        <td><input></td>
        <td><button onclick="removeTrack('track${count}')">删除</button></td>
    `;
	document.getElementById("track_listing").appendChild(trackRow);
}

function removeTrack(id) {
	document.getElementById(id).remove();
}
