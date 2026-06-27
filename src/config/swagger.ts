import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger-options";
import path from "path";
import fs from "fs";

export const swaggerSpec = (() => {
  if (process.env.NODE_ENV === "production") {
    try {
      const specPath = path.join(__dirname, "swagger-spec.json");
      if (fs.existsSync(specPath)) {
        return JSON.parse(fs.readFileSync(specPath, "utf8"));
      }
    } catch (error) {
      console.error("Failed to load pre-generated swagger-spec.json:", error);
    }
  }

  // Fallback / Development mode: generate dynamically
  return swaggerJsdoc(options);
})();
