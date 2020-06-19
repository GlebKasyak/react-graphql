import { config } from "dotenv";
import path from "path";

const root = path.join(__dirname, ".env");
config({ path: root });

export default {
    PORT: process.env.PORT!,
    MONGODB_URL: process.env.MONGODB_URL!
}