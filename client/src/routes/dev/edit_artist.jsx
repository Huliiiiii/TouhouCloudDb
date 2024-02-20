import {MetaProvider, Title} from "@solidjs/meta";
import {useParams} from "@solidjs/router";
import {createResource, Switch, Match, createSignal} from "solid-js";

const fetchArtist = async () => {
	const res = await fetch(`http://127.0.0.1:3007/api/search/artist?id=${useParams().id}`);
	return res.json();
};

const DevEditArtist = function () {
	const [artist_data] = createResource(fetchArtist);
	const [artist_type, set_artist_type] = createSignal("");
	return (
		<>
			<MetaProvider>
				<Title>Dev Edit Artist</Title>
			</MetaProvider>
			<Switch>
				<Match when={artist_data.loading}>
					<div>少女祈祷中……</div>
				</Match>
				<Match when={artist_data() == 0 && useParams().id}>
					<div>Artist Not Found</div>
					<a href="/dev/edit/release">前去新增艺术家</a>
				</Match>
				<Match when={artist_data() != 0}>
					<form action="http://127.0.0.1:3007/dev/edit/artist" method="post" target="_blank">
						<h2>编辑艺术家</h2>
						<input type="hidden" name="id" value={artist_data()[0].id} />
						<div>
							<h4 for="name">名称</h4>
							<input type="text" id="name" name="name" value={artist_data()[0].name} required />
						</div>
						<div>
							<h4>类型</h4>
							<select
								type="text"
								name="artist_type"
								value={artist_data()[0].artist_type ? artist_data()[0].artist_type : ""}
								onChange={(e) => set_artist_type(e.target.value)}
								required
							>
								<option value="">--请选择--</option>
								<option value="person">个人</option>
								<option value="group">团体</option>
							</select>
						</div>
						<div>
							<h4>名称变体</h4>
							<input type="text" name="name_variant" value={artist_data()[0].name_variant} />
						</div>
						<div>
							<h4>别名</h4>
							<input type="text" name="alias" value={artist_data()[0].alias} />
						</div>
						<div>
							<Switch>
								<Match when={artist_type() == "person"}>
									<h4>出生日期</h4>
									<input type="text" name="birth_or_formed_date" value={artist_data()[0].birth_or_formed_date} />
								</Match>
								<Match when={artist_type() == "group"}>
									<h4>形成日期</h4>
									<input type="text" name="birth_or_formed_date" value={artist_data()[0].birth_or_formed_date} />
								</Match>
								<Match when={artist_type() == ""}>
									<h4>出生/形成日期</h4>
									<input type="text" placeholder="请先选择艺术家类型" disabled />
								</Match>
							</Switch>
						</div>
						<div>
							<Switch>
								<Match when={artist_type() == "person"}>
									<h4>所属团体</h4>
									<input type="text" name="member_of" value={artist_data()[0].member_of} />
								</Match>
								<Match when={artist_type() == "group"}>
									<h4>成员名单</h4>
									<input type="text" name="member" value={artist_data()[0].members} />
								</Match>
								<Match when={artist_type() == ""}>
									<h4>所属团体/成员名单</h4>
									<input type="text" placeholder="请先选择艺术家类型" disabled />
								</Match>
							</Switch>
						</div>
						<div>
							<h4>相关艺术家</h4>
							<input type="text" name="related_artist" value={artist_data()[0].related_artist} />
						</div>
						<div>
							<h4>ncm id</h4>
							<input type="number" name="ncm_id" value={artist_data()[0].ncm_id} />
						</div>
						<input type="submit" action="/">
							提交
						</input>
					</form>
					<div style={{width: "100%", height: "200px"}} />
				</Match>
				<Match when={artist_data.error}>
					<div>好像出现了异变……</div>
				</Match>
			</Switch>
		</>
	);
};

export default DevEditArtist;
