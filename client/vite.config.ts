import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
export default defineConfig({
	plugins: [tailwindcss(), solid()],
	build: {
		target: "es2015"
	},
	resolve: {
		alias: {
			compoments: path.resolve(__dirname, "src/compoments"),
			routes: path.resolve(__dirname, "src/routes"),
			src: path.resolve(__dirname, "src"),
			types: path.resolve(__dirname, "src/types")
		}
	}
});
