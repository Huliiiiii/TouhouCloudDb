import "/src/App.css";

function HomePage() {
	return (
		<>
			<div>
				<h1>车万云数据库</h1>
				<p>咕咕咕咕咕，咕咕咕咕咕</p>
				<li>
					<a href="/list/albums">专辑列表</a>
				</li>
				<li>
					<a href="/list/songs">曲目列表</a>
				</li>
				<li>
					<a href="/add/release">添加发行</a>
				</li>
				<li>
					<a href="/add/song">添加歌曲</a>
				</li>
				<li>
					<a href="/dev/edit/release">编辑发行-dev</a>
				</li>
				<li>
					<a href="/dev/edit/release">编辑艺术家-dev</a>
				</li>
				<li>
					<a href="/dev/edit/song">编辑曲目-dev</a>
				</li>
				<li>
					<a href="/dev/edit/role">编辑音乐角色-dev</a>
				</li>
				<li>
					<a href="/dev/list/song">曲目列表-dev</a>
				</li>
				<li>
					<a href="/dev/test">测试页面</a>
				</li>
			</div>
		</>
	);
}

export default HomePage;
