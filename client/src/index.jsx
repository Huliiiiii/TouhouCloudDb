/* @refresh reload */
import {render} from "solid-js/web";
import {Route, Router} from "@solidjs/router";
import {lazy, ErrorBoundary} from "solid-js";
import "./index.css";

function lazyImport(file_path) {
	return lazy(function () {
		return import(/* @vite-ignore */ file_path);
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
			},
			{
				path: "/list/song",
				component: lazyImport("/src/routes/dev/list_song")
			},
			{
				path: "/test",
				component: lazyImport("/src/routes/dev/test")
			}
		]
	}
];

function App() {
	return (
		<>
			<ErrorBoundary fallback={(err) => err}>
				<div style={{height: "10%"}}>
					<button href="#" onClick={() => history.back()}>
						return
					</button>
				</div>
				<Router>
					<Route>{routes}</Route>
					<Route path="*" component={() => <div>404</div>} />
				</Router>
			</ErrorBoundary>
		</>
	);
}

render(App, document.getElementById("root"));
