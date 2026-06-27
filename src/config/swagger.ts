import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger-options";
import path from "path";
import fs from "fs";

export const swaggerSpec = (() => {
  if (process.env.NODE_ENV === "production") {
    try {
      const specPath = path.join(process.cwd(), "src/config/swagger-spec.json");
      if (fs.existsSync(specPath)) {
        console.log(`Successfully loaded Swagger spec from ${specPath}`);
        return JSON.parse(fs.readFileSync(specPath, "utf8"));
      } else {
        console.warn(`Swagger spec file not found at: ${specPath}`);
      }
    } catch (error) {
      console.error("Failed to load pre-generated swagger-spec.json:", error);
    }
  }

  // Fallback / Development mode: generate dynamically
  return swaggerJsdoc(options);
})();
