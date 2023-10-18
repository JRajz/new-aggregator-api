const fs = require("fs").promises;
const path = require("path");

async function writeFile(newData, dataType) {
  const filePath = path.join(__dirname, "..", `data/${dataType}.json`);

  // writing into file
  try {
    await fs.writeFile(filePath, JSON.stringify(newData), {
      encoding: "utf8",
      flag: "w",
    });

    return false;
  } catch (err) {
    console.log(`Failed to write file. Error:` + err);
    return true;
  }
}

module.exports = { writeFile };
