const fs = require("fs");
const path = require("path");
const multer = require("multer");

// Create a storage strategy for multer
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    console.log("the name", file.originalname);
    const { code } = req.body;
    fs.mkdir(
      path.join(__dirname, "..", "static-files", "products-images", `${code}`),
      { recursive: true },
      (err) => {
        if (err) {
          return console.error(err);
        } else {
          console.log("Directory created successfully!");
          cb(null, `static-files/products-images/${code}`);
        }
      }
    );
  },
  filename: (req, file, cb) => {
    // const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, file.originalname);
  },
});
// Create a multer instance with the storage strategy
const saveProductImages = multer({ storage: storage });
module.exports = saveProductImages;
