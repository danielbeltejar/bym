import fs, { FileHandle } from "fs/promises";
import { randomBytes } from "crypto";
import { logging, errorLog } from "./logger.js";

/**
 * Check if `.env` file exists, if not, copy `env.example` contents
 * to `.env` and auto-generate random secret key
 */
export const firstRunEnv = async () => {
  try {
    const fh: FileHandle = await fs.open(".env", "wx");
    const exampleEnv = await fs.readFile("example.env", "utf8");
    const secretKey = randomBytes(32).toString("hex");
    const populatedSecretKey = exampleEnv.replace(
      "SECRET_KEY=",
      `SECRET_KEY=${secretKey}`
    );

    await Promise.all([
      fh.write(populatedSecretKey, 0, "utf8"),
      !process.env.SECRET_KEY && (process.env.SECRET_KEY = secretKey),
      fh.close(),
    ]);
    
  } catch (err) {
    if (err.code === "EEXIST") {
      logging(".env file already exists.");
    } else {
      errorLog(`Unexpected env copying error, reason: ${err}`);
    }
  }
};
