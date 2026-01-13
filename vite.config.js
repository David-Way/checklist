import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	base: "/checklist",
	resolve: {
		alias: {
			"@components": path.resolve(__dirname, "./src/components"),
		},
	},
	server: {
		cors: {
			// the origin you will be accessing via browser
			origin: "https://github.com/",
		},
	},
});

// https://github.com/David-Way/checklist/blob/main/src/data//checklist/1000000.json