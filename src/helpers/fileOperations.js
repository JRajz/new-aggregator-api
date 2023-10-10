const fs = require("fs");
const path = require("path");

async function writeFile(newData, dataType) {
  const filePath = path.join(__dirname, "..", `data/${dataType}.json`);

  // writing into file
  try {
    console.log(`Writing File ${dataType}.json`);

    await fs.writeFile(
      filePath,
      JSON.stringify(newData),
      {
        encoding: "utf8",
        flag: "w",
      },
      () => {}
    );

    return false;
  } catch (err) {
    console.log("Failed to write file.");
    console.log(err);
    return true;
  }
}

module.exports = { writeFile };
