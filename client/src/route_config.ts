import { lazy } from "solid-js";

export const route_config: any = [
	{
		path: "/signin",
		component: lazy(() => import("./routes/SignIn.tsx"))
	},
	{
		path: "/signup",
		component: lazy(() => import("./routes/SignUp.tsx"))
	},
	{
		path: "/add",
		children: [
			{
				path: "/release",
				component: lazy(() => import("./routes/add/add_release.jsx"))
			}
		]
	},
	{
		path: "/update",
		children: [
			{
				path: "/release/:ID",
				component: lazy(() => import("./routes/add/add_release"))
			}
		]
	},
	{
		path: "/list",
		children: [
			{
				path: "/albums",
				component: lazy(() => import("./routes/list/AlbumList"))
			}
		]
	},
	{
		path: "/dev",
		children: [
			{
				path: "/edit/release/:id?",
				component: lazy(() => import("./routes/dev/edit_release"))
			},
			{
				path: "/edit/artist/:id?",
				component: lazy(() => import("./routes/dev/edit_artist"))
			},
			{
				path: "/edit/song/:id?",
				component: lazy(() => import("./routes/dev/edit_song/edit_song.tsx"))
			},
			{
				path: "/list/song",
				component: lazy(() => import("./routes/dev/list_song"))
			},
			{
				path: "/test",
				component: lazy(() => import("./routes/test"))
			}
		]
	}
];
