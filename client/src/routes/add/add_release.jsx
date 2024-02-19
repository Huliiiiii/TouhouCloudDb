// import "/src/App.css";
import {MetaProvider, Title} from "@solidjs/meta";
import AddReleaseArtist from "./add_release_AddReleaseArtist";
import FormatSelector from "./add_release_FormatSelector";
import TypeSelector from "./add_release_TypeSelector";
import Tracklist from "./add_release_Tracklist";
function addReleasePage() {
	return (
		<>
			<MetaProvider>
				<Title>Add Release</Title>
			</MetaProvider>
			<form>
				<h3>添加发行</h3>
				<div>
					<div>
						<h4>标题</h4>
						<input />
					</div>
					<div>
						<AddReleaseArtist />
						<div>
							<h4>发行署名</h4>
							<div>
								<input type="radio" name="album_credit_name" id="default_album_credit_name" checked />
								<label for="default_album_credit_name" id="default_album_credit_name_label">
									Deafult:
								</label>
							</div>
							<div>
								<input type="radio" name="album_credit_name" id="custom_album_credit_name" />
								<label for="default_album_credit_name">
									<input placeholder="Custom" />
								</label>
							</div>
						</div>
					</div>
					<div>
						<p>发行日期</p>
						<p>
							<input type="date" name="" id="" />
						</p>
					</div>
					<TypeSelector />
					<FormatSelector />
					<div>
						<p>发行商</p>
						<p>
							<input type="text" name="" id="" />
						</p>
					</div>
					<div>
						<p>目录编号</p>
						<p>
							<input type="text" name="" id="" />
						</p>
					</div>
					<div>
						<p>分类器</p>
						<p>
							<input />
						</p>
					</div>
				</div>
				<Tracklist />
			</form>
		</>
	);
}

export default addReleasePage;
