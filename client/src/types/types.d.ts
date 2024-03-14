export type song_data = {
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
};

export type ArtistData = {
	id: number;
	name: string;
	name_variant: string[] | null;
	alias: string[] | null;
	artist_type: string;
	birth_or_formed_date: Date | null;
	member_of: string[] | null;
	members: string[] | null;
	related_artist: string[] | null;
	ncm_id: number;
	is_deleted: 0 | 1;
};
