/* @refresh reload */
import {render} from "solid-js/web";
import {Router, Route} from "@solidjs/router";
import {lazy, ErrorBoundary} from "solid-js";
import "./index.css";

let lazyImport = function (file_path) {
	return lazy(function () {
		return import(file_path);
	});
};

const routes = [
	{
		path: "/",
		component: lazyImport("/src/routes/home")
	},
	{
		path: "/add",
		children: [
			{
				path: "/release",
				component: lazyImport("/src/routes/add/add_release")
			}
		]
	},
	{
		path: "/update",
		children: [
			{
				path: "/release/:ID",
				component: lazyImport("/src/routes/add/add_release")
			}
		]
	},
	{
		path: "/list",
		children: [
			{
				path: "/albums",
				component: lazyImport("/src/routes/list/AlbumList")
			}
		]
	},
	{
		path: "/dev",
		children: [
			{
				path: "/edit/release/:id?",
				component: lazyImport("/src/routes/dev/edit_release")
			}
		]
	}
];

render(function () {
	return (
		<>
			<ErrorBoundary fallback={(err) => err}>
				<Router>
					<Route>{routes}</Route>
				</Router>
			</ErrorBoundary>
		</>
	);
}, document.getElementById("root"));
