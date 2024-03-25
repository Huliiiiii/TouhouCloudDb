import { Static, Type } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";

export type User = Static<typeof userSchema>;
export type Username = Static<typeof usernameSchema>;
export type Password = Static<typeof passwordSchema>;

export const usernameSchema = Type.Object({
	username: Type.String({ maxLength: 18, minLength: 3 }),
});

export const usernameCompiler = TypeCompiler.Compile(usernameSchema);

export const passwordSchema = Type.Object({
	password: Type.String({ maxLength: 18, minLength: 6 }),
});

export const passwordCompiler = TypeCompiler.Compile(passwordSchema);

export const userSchema = Type.Composite([usernameSchema, passwordSchema]);
export const userCompiler = TypeCompiler.Compile(userSchema);
