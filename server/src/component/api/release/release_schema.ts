import { Static, Type, Unknown } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import {
	idArraySchema,
	regular_Number_Schema,
	titleSchema,
	artistNameSchema,
} from "../data_schema";

//

export const releaseArtistSchema = idArraySchema;
export type ReleaseArtist = Static<typeof releaseArtistSchema>;
export const releaseArtistCompiler = TypeCompiler.Compile(releaseArtistSchema);

// TODO

export type DateYMD = Static<typeof releaseDateSchema>;
export const releaseDateSchema = Type.String();
export const releaseDateCompiler = TypeCompiler.Compile(releaseDateSchema);

// TODO

export const releaseTypeSchema = Type.String();
export type ReleaseType = Static<typeof releaseTypeSchema>;
export const releaseTypeCompiler = TypeCompiler.Compile(releaseTypeSchema);

// TODO

export const releaseFormatSchema = Type.String();
export type ReleaseFormat = Static<typeof releaseFormatSchema>;
export const releaseFormatCompiler = TypeCompiler.Compile(releaseFormatSchema);

// TODO

export const publisherSchema = idArraySchema;
export type Publisher = Static<typeof publisherSchema>;
export const publisherCompiler = TypeCompiler.Compile(publisherSchema);

// TODO

export const catalogNumSchema = Type.String();
export type CatalogNum = Static<typeof catalogNumSchema>;
export const catalogNumCompiler = TypeCompiler.Compile(catalogNumSchema);

// TODO

export const trackListingSchema = Type.Array(Unknown());
export type TrackListing = Static<typeof trackListingSchema>;
export const trackListingCompiler = TypeCompiler.Compile(trackListingSchema);

//

export const isDeleteSchema = Type.Number({ minimum: 0, maximum: 1 });
export type isDeleted = 0 | 1;
export const isDeleteCompiler = TypeCompiler.Compile(isDeleteSchema);

//

export const releaseSchema = Type.Object({
	id: regular_Number_Schema,
	title: titleSchema,
	release_artist: releaseArtistSchema,
	override_credit_name: artistNameSchema,
	release_date: releaseDateSchema,
	release_type: releaseTypeSchema,
	release_format: releaseFormatSchema,
	publisher: publisherSchema,
	catalog_num: catalogNumSchema,
	track_listing: trackListingSchema,
	classfier: Unknown(),
	ncm_id: Type.Number(),
	is_deleted: isDeleteSchema,
});

export type IRelease = Static<typeof releaseSchema>;
export const releaseCompiler = TypeCompiler.Compile(releaseSchema);
