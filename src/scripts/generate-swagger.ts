import fs from "fs";
import path from "path";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "../config/swagger-options";

// Target the routes using absolute paths to guarantee they match during the build process
const swaggerSpec = swaggerJsdoc({
  ...options,
  apis: [path.join(__dirname, "../routes/*.ts")],
});

// Save to src/config/swagger-spec.json
const srcPath = path.join(__dirname, "../config/swagger-spec.json");
fs.writeFileSync(srcPath, JSON.stringify(swaggerSpec, null, 2), "utf8");
console.log(`Swagger spec generated successfully at: ${srcPath}`);

// Also save to dist/config/swagger-spec.json if dist/config exists
const distConfigDir = path.join(__dirname, "../../dist/config");
if (fs.existsSync(distConfigDir)) {
  const distPath = path.join(distConfigDir, "swagger-spec.json");
  fs.writeFileSync(distPath, JSON.stringify(swaggerSpec, null, 2), "utf8");
  console.log(`Swagger spec copied to: ${distPath}`);
}
