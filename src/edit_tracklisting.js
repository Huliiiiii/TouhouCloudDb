/* eslint-disable no-unused-vars */
let track_count = 0;

function addTrack() {
	track_count++;
	const trackRow = document.createElement("tr");
	trackRow.id = `track${track_count}`;
	trackRow.draggable = true;
	trackRow.innerHTML = `
        <td><input></td>
        <td><input></td>
        <td><button onclick="removeElementByID('track${track_count}')">删除</button></td>
    `;
	document.getElementById("track_listing").appendChild(trackRow);
}

function removeElementByID(id) {
	document.getElementById(id).remove();
}
