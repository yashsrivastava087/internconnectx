import DatauriParser from "datauri/parser.js";
import path from "path";

const parser = new DatauriParser();

const getDataUri = (file) => {
    if (!file) return null;

    const extName = path.extname(file.originalname).toLowerCase();
    if (extName === ".pdf") {
        return parser.format(".pdf", file.buffer);
    }
    return parser.format(extName, file.buffer);
};

export default getDataUri;
