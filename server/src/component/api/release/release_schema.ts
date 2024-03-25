import { Static, Type, Unknown } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import {
	idArraySchema,
	regular_Number_Schema,
	titleSchema,
	artistNameSchema,
	isDeletedSchema,
} from "../music_data_schema";

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

export const publisherSchema = Type.Union([
	idArraySchema,
	Type.Null(),
	Type.Undefined(),
]);
export type Publisher = Static<typeof publisherSchema>;
export const publisherCompiler = TypeCompiler.Compile(publisherSchema);

// TODO

export const catalogNumSchema = Type.Union([
	Type.String(),
	Type.Null(),
	Type.Undefined(),
]);
export type CatalogNum = Static<typeof catalogNumSchema>;
export const catalogNumCompiler = TypeCompiler.Compile(catalogNumSchema);

// TODO

export const trackListingSchema = Type.Union([
	Type.Array(Unknown()),
	Type.Null(),
	Type.Undefined(),
]);
export type TrackListing = Static<typeof trackListingSchema>;
export const trackListingCompiler = TypeCompiler.Compile(trackListingSchema);

//

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
	is_deleted: isDeletedSchema,
});

export type Release = Static<typeof releaseSchema>;
export const releaseCompiler = TypeCompiler.Compile(releaseSchema);
