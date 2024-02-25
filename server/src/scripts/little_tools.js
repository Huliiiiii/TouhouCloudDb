/* eslint-disable no-unused-vars */
// debounce 函数的默认延迟时间为 700ms
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

function if_A_Return_B_else_C(a, b, c) {
	if (a) return b;
	return c;
}

// replace
function replaceWithRegExp(regexp, repl, str) {
	return str.replace(regexp, repl);
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

try {
	module.exports = exports = {
		debounce,
		if_A_Return_B_else_C,
		replaceWithRegExp,
		fetchData,
		global_delay,
	};
} catch (err) {
	console.log(err);
}
