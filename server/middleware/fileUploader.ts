import multer from "multer";

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "public/files"),
    filename: (req, file, cb) => {
        const encodedTitle = encodeURIComponent(req.body.title).replace(/%/g, "");
        const filename = btoa(encodedTitle + Date.now()).replace(/=+$/, ""); ;
        const extension = file.originalname.split(".")[1];
        cb(null, `${filename}.${extension}`)
    }
});

export const fileUploader = multer({storage: fileStorage});