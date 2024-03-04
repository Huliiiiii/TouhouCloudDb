export interface song_data {
	id: string;
	title: string;
	artist: number[];
	credits: Array<{
		role: string;
		artist_id: number;
		override_credit_name?: string;
	}>;
	duration: string;
	lyrics: string;
	is_deleted: number;
}
export interface artist_data {
	id: string;
	name: string;
}
