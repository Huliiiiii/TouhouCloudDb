// import "/src/App.css";
import { MetaProvider, Title } from "@solidjs/meta";
import { For } from "solid-js";

interface link {
	url: string;
	label: string;
}

const links: link[] = [
	{ url: "/list/albums", label: "专辑列表" },
	{ url: "/list/songs", label: "曲目列表" },
	{ url: "/list/release", label: "发行列表" },
	{ url: "/add/release", label: "添加发行" },
	{ url: "/add/song", label: "添加歌曲" },
	{ url: "/dev/edit/release", label: "编辑发行-dev" },
	{ url: "/dev/edit/release", label: "编辑艺术家-dev" },
	{ url: "/dev/edit/song", label: "编辑曲目-dev" },
	{ url: "/dev/edit/role", label: "编辑音乐角色-dev" },
	{ url: "/dev/list/song", label: "曲目列表-dev" },
	{ url: "/dev/test", label: "测试页面" }
];

function HomePage() {
	return (
		<>
			<MetaProvider>
				<Title>车万云数据库</Title>
			</MetaProvider>
			<div>
				<h1>车万云数据库</h1>
				<p>咕咕咕咕咕，咕咕咕咕咕</p>
				<For each={links}>
					{(link) => (
						<li>
							<a href={link.url}>{link.label}</a>
						</li>
					)}
				</For>
			</div>
		</>
	);
}

export default HomePage;
