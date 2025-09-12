import fs from "fs";
import path from "path";

export const  saveFile =(data:string[],name:string) => {
    fs.writeFileSync(
        path.join(process.cwd(), "public", name),
        JSON.stringify(data, null, 2),
        "utf-8"
      );
}
