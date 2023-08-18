import fs from "fs";
import { join } from "path";

export const getPosts = () => {
  const postsDirectory = join(process.cwd(), "src/_posts");
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames;
};
