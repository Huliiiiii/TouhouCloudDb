import {Index, createResource} from "solid-js";
import {MetaProvider, Title} from "@solidjs/meta";
import moment from "moment";

import "/src/App.css";

const get_album_info = async () => {
	const response = await fetch("http://127.0.0.1:3007/list/albums");
	return response.json();
};

function AlbumList() {
	const [data] = createResource(get_album_info);
	return (
		<>
			<MetaProvider>
				<div>
					<Title>Album List</Title>
				</div>
			</MetaProvider>
			<div>
				<Index each={data()}>
					{(album) => {
						// eslint-disable-next-line solid/reactivity
						var date = album().releasedDate;
						var date_f = moment(date).format("YYYY-MM-DD");
						return (
							<p>
								<a href="TOOD">{album().title}</a> /{" "}
								<a href="TODO">
									{album().artist != null ? album().artist.join(", ") : "n/a"} - {album().releasedDate != null ? date_f : "n/a"}
								</a>
							</p>
						);
					}}
				</Index>
			</div>
		</>
	);
}

export default AlbumList;
