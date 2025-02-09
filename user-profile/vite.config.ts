import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// lso don't forget to `npm i -D @types/node`, so __dirname won't complain
import * as path from "path";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  plugins: [react()],
});
