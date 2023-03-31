import dotenv from "dotenv";

dotenv.config();

interface Config {
  GQL_API: string;
}

const config: Config = {
  GQL_API: process.env.GQL_API || "http://localhost:4000/graphql",
};

export default config;
