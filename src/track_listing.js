/* eslint-disable no-unused-vars */
let count = 0;

function increment() {
	count++;
	document.getElementById("track_listing").innerHTML += `
        <tr id="track${count}">
            <td><input></td>
            <td><input></td>
            <td><button onclick="decrement(${count})">删除</button></td>
        </tr>`;
}

function decrement(id) {
	document.getElementById(`track${id}`).remove();
}
