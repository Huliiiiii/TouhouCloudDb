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
	console.log("abc");
	return str.replace(regexp, repl);
}

try {
	module.exports = exports = {
		debounce,
		if_A_Return_B_else_C,
		replaceWithRegExp,
	};
} catch (err) {
	console.log(err);
}
