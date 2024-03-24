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

export const keywordSchema = regular_String_Schema;
export type Keyword = Static<typeof keywordSchema>;
export const keywordCompiler = TypeCompiler.Compile(keywordSchema);

export const idArraySchema = Type.Array(idSchema);
export type IDArray = Static<typeof idArraySchema>;
export const idArrayCompiler = TypeCompiler.Compile(idArraySchema);

// TODO: 正则表达式过滤掉不合法的请求

export const idQuerySchema = Type.String({
	minLength: 1,
	maxLength: 10,
	pattern: "^[0-9]+$",
});
export type IDQuery = Static<typeof idQuerySchema>;
export const idQueryCompiler = TypeCompiler.Compile(idQuerySchema);

export const keywordQuerySchema = keywordSchema;
export type KeywordQuery = Static<typeof keywordQuerySchema>;
export const keywordQueryCompiler = TypeCompiler.Compile(keywordQuerySchema);

export const IDQueryObjectSchema = Type.Object({
	id: idQuerySchema,
});

export type IDQueryObject = Static<typeof IDQueryObjectSchema>;
export const IDQueryObjectCompiler = TypeCompiler.Compile(IDQueryObjectSchema);

export const keywordQueryObjectSchema = Type.Object({
	keyword: keywordQuerySchema,
});

export type KeywordQueryObject = Static<typeof keywordQueryObjectSchema>;
export const keywordQueryObjectCompiler = TypeCompiler.Compile(
	keywordQueryObjectSchema
);

export const getQuerySchema = Type.Union([
	IDQueryObjectSchema,
	keywordQueryObjectSchema,
]);

export type GetQuery = Static<typeof getQuerySchema>;
export const getQueryCompiler = TypeCompiler.Compile(getQuerySchema);
//

export const artistNameSchema = regular_String_Schema;
export type ArtistName = Static<typeof artistNameSchema>;
export const artistNameCompiler = TypeCompiler.Compile(artistNameSchema);

//

export const titleSchema = regular_String_Schema;
export type Title = Static<typeof titleSchema>;
export const titleCompiler = TypeCompiler.Compile(titleSchema);

// is deleted
export const isDeletedSchema = Type.Union([Type.Literal(0), Type.Literal(1)]);
export type isDeleted = Static<typeof isDeletedSchema>;
export const isDeletedCompiler = TypeCompiler.Compile(isDeletedSchema);
