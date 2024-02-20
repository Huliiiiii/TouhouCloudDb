import {MetaProvider, Title} from "@solidjs/meta";
import {useParams} from "@solidjs/router";
import {createResource, Switch, Match} from "solid-js";

const fetchRelease = async () => {
	const res = await fetch(`http://127.0.0.1:3007/api/search/release?id=${useParams().id}`);
	return res.json();
};

const DevEditRelease = function () {
	const [release_data] = createResource(fetchRelease);

	return (
		<>
			<MetaProvider>
				<Title>Dev Edit Release</Title>
			</MetaProvider>
			<Switch>
				<Match when={release_data.loading}>
					<div>少女祈祷中……</div>
				</Match>
				<Match when={release_data() == 0 && useParams().id}>
					<div>Release Not Found</div>
					<a href="/dev/edit/release">前去新增发行</a>
				</Match>
				<Match when={release_data() != 0}>
					<form action="http://127.0.0.1:3007/dev/edit/release" method="post" target="_blank">
						<h2>编辑发行</h2>
						<input type="hidden" name="id" value={release_data()[0].id} />
						<div>
							<h4 for="title">标题/title</h4>
							<input type="text" id="title" name="title" value={release_data()[0].title} required />
						</div>
						<div>
							<h4 for="release_artist">发行艺术家/release_artist</h4>
							<p>像1,2,3,4,5</p>
							<input type="text" id="release_artist" name="release_artist" placeholder="填入id" value={release_data()[0].release_artist} required />
						</div>
						<div>
							<h4 for="override_credit_name">覆盖署名/override_credit_name</h4>
							<input type="text" id="override_credit_name" name="override_credit_name" value={release_data()[0].override_credit_name} />
						</div>
						<div>
							<h4 for="release_date">发行日期/release_date</h4>
							<input type="text" id="release_date" name="release_date" value={release_data()[0].release_date} />
						</div>
						<div>
							<h4>发行类型/Release Type</h4>
							<select id="release_type" value={release_data()[0].release_type} required>
								<option value="">--请选择--</option>
								<option value="Album">Album</option>
								<option value="EP">EP</option>
								<option value="Single">Single</option>
								<option value="Compilation">Compilation</option>
								<option value="Others">Others</option>
							</select>
						</div>
						<div>
							<h4>发行介质/Release Format</h4>
							<select id="release_format" value={release_data()[0].release_format} required>
								<option value="">--请选择--</option>
								<option value="CD">CD</option>
								<option value="Digital">Digital</option>
								<option value="Vinyl">Vinyl</option>
								<option value="DVD">DVD</option>
							</select>
						</div>
						<div>
							<h4>publisher</h4>
							<h5>留空</h5>
							<input type="text" id="publisher" name="publisher" />
						</div>
						<div>
							<h4 for="catalog_num">catalog_num</h4>
							<input type="text" id="catalog_num" name="catalog_num" />
						</div>
						<div>
							<h4>曲目列表</h4>
							<h6>像[&lbrace;"track_num":"xxx", "id":"xxx", "title": "xxx", "length": "xxx"&rbrace;]</h6>
							<label for="track_listing">track_listing</label>
							<textarea type="json" id="track_listing" name="track_listing" placeholder='像&lbrace;id:"xxx", title: "xxx", length: "xxx"&rbrace;'>
								{release_data()[0].track_listing != null ? JSON.stringify(release_data()[0]?.track_listing) : ""}
							</textarea>
						</div>
						<div>
							<h4 for="classfier">classfier</h4>
							<input type="text" id="classfier" name="classfier" />
						</div>
						<div>
							<h4 for="ncm_id">ncm_id</h4>
							<input type="text" id="ncm_id" name="ncm_id" />
						</div>
						<input type="submit" action="/">
							提交
						</input>
					</form>
					<div style={{width: "100%", height: "200px"}} />
				</Match>
				<Match when={release_data.error}>
					<div>好像出现了异变……</div>
				</Match>
			</Switch>
		</>
	);
};

export default DevEditRelease;
