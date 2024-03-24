import { Type, Static } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";

export const regular_String_Schema = Type.String({
	minLength: 1,
	maxLength: 45,
});
export const regular_Number_Schema = Type.Number({
	minLength: 1,
	maxLength: 10,
});

//

export const idSchema = Type.Number({ minLength: 1, maxLength: 10 });
export type ID = Static<typeof idSchema>;
export const idCompiler = TypeCompiler.Compile(idSchema);

export const idArraySchema = Type.Array(idSchema);
export type IDArray = Static<typeof idArraySchema>;
export const idArrayCompiler = TypeCompiler.Compile(idArraySchema);
//

export const artistNameSchema = regular_String_Schema;
export type ArtistName = Static<typeof artistNameSchema>;
export const artistNameCompiler = TypeCompiler.Compile(artistNameSchema);

//

export const titleSchema = regular_String_Schema;
export type Title = Static<typeof titleSchema>;
export const titleCompiler = TypeCompiler.Compile(titleSchema);
