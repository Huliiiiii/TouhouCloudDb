/* @refresh reload */
import { render } from "solid-js/web";
import { Route, Router } from "@solidjs/router";
import { lazy, ErrorBoundary } from "solid-js";
import "./index.css";

const routes = [
	{
		path: "/",
		component: lazy(() => import("/src/homepage"))
	},
	{
		path: "/add",
		children: [
			{
				path: "/release",
				component: lazy(() => import("/src/routes/add/add_release"))
			}
		]
	},
	{
		path: "/update",
		children: [
			{
				path: "/release/:ID",
				component: lazy(() => import("/src/routes/add/add_release"))
			}
		]
	},
	{
		path: "/list",
		children: [
			{
				path: "/albums",
				component: lazy(() => import("/src/routes/list/AlbumList"))
			}
		]
	},
	{
		path: "/dev",
		children: [
			{
				path: "/edit/release/:id?",
				component: lazy(() => import("/src/routes/dev/edit_release"))
			},
			{
				path: "/edit/artist/:id?",
				component: lazy(() => import("/src/routes/dev/edit_artist"))
			},
			{
				path: "/edit/song/:id?",
				component: lazy(() => import("/src/routes/dev/edit_song"))
			},
			{
				path: "/list/song",
				component: lazy(() => import("/src/routes/dev/list_song"))
			},
			{
				path: "/test",
				component: lazy(() => import("/src/routes/dev/test"))
			}
		]
	}
];

function App() {
	return (
		<>
			<ErrorBoundary fallback={(err) => err}>
				<div style={{ height: "10%" }}>
					<button
						onClick={() => {
							window.location.href = "/";
						}}
					>
						return
					</button>
				</div>
				<Router>
					<Route>{routes}</Route>
					<Route path="*" component={() => <div>404 Not Found</div>} />
				</Router>
			</ErrorBoundary>
		</>
	);
}
render(App, document.getElementById("root")!);
