import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import {generateScopedName} from "./config/generateScopedName";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    css: {
        modules: {
            scopeBehaviour: "local",
            generateScopedName: generateScopedName,
        }
    },
    base: "/shoppingList/",

});
