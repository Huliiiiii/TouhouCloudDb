/* @refresh reload */
import {render} from "solid-js/web";
import {Router, Route} from "@solidjs/router";
import {lazy, ErrorBoundary} from "solid-js";
import "./index.css";

function lazyImport(file_path) {
	return lazy(function () {
		/* @vite-ignore */
		return import(file_path);
	});
}

const routes = [
	{
		path: "/",
		component: lazyImport("/src/homepage")
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
			},
			{
				path: "/edit/artist/:id?",
				component: lazyImport("/src/routes/dev/edit_artist")
			},
			{
				path: "/edit/song/:id?",
				component: lazyImport("/src/routes/dev/edit_song")
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
