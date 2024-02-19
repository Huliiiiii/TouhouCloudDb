import {MetaProvider, Title} from "@solidjs/meta";
import {useParams} from "@solidjs/router";
import {Show, createResource, For} from "solid-js";

// const SelectedType = function (release_type) {
// 	const type_element = document.getElementById("release_type");
// 	Array.from(type_element.option).forEach((option) => {
// 		if (option.value === release_type) {
// 			option.selected = true;
// 		}
// 	});
// };
const fetchRelease = async () => {
	const res = await fetch(`http://127.0.0.1:3007/api/search/release?id=${useParams().id}`);
	return res.json();
};

const DevEditRelease = function () {
	const [resource] = createResource(fetchRelease);

	// 编辑目标存在时显示
	const ReleaseExist = () => {
		return (
			<>
				<MetaProvider>
					<Title>Dev Edit Release</Title>
				</MetaProvider>
				{/* 这里不调用SolidJS的响应式方法就得不到resource的值 */}
				<For each={resource()}>
					{(release_data) => (
						<>
							<form action="http://127.0.0.1:3007/dev/edit/release" method="post" target="_blank">
								<h2>编辑发行</h2>
								<div>
									<h4 for="title">标题/title</h4>
									<input type="text" id="title" name="title" value={release_data.title} required />
								</div>
								<div>
									<h4 for="release_artist">发行艺术家/release_artist</h4>
									<p>像1,2,3,4,5</p>
									<input type="text" id="release_artist" name="release_artist" placeholder="填入id" value={release_data.release_artist} required />
								</div>
								<div>
									<h4 for="override_credit_name">覆盖署名/override_credit_name</h4>
									<input type="text" id="override_credit_name" name="override_credit_name" value={release_data.override_credit_name} />
								</div>
								<div>
									<h4 for="release_date">发行日期/release_date</h4>
									<input type="text" id="release_date" name="release_date" value={release_data.release_date} />
								</div>
								<div>
									<h4>发行类型/Release Type</h4>
									<select id="release_type" value={release_data.release_type} required>
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
									<select id="release_format" value={release_data.release_format} required>
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
									<h6>像&lbrace;id:"xxx", title: "xxx", length: "xxx"&rbrace;</h6>
									<label for="track_listing">track_listing</label>
									<textarea type="text" id="track_listing" name="track_listing" placeholder='像&lbrace;id:"xxx", title: "xxx", length: "xxx"&rbrace;'>
										{JSON.stringify(release_data.track_listing)}
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
						</>
					)}
				</For>
			</>
		);
	};
	return (
		<>
			<Show when={resource == 0 && useParams().id} fallback={<ReleaseExist />}>
				<div>Release Not Found</div>
				<a href="/dev/edit/release">前去新增发行</a>
			</Show>
		</>
	);
};

export default DevEditRelease;
