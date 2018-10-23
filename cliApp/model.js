const FileCreator = require('./fileCreator');
const path = require('path');
const config = require('../.chainfile');

const samplePath = path.join(__dirname, '../', 'example', 'model.js');


const createFile = async(table_name, values) => {
  const filePath = path.join(config.models.directory, `${table_name}.js`);
  const Model = new FileCreator(samplePath, filePath);
  await Model.create(values);
};


function getName(table_name) {
  const parts = table_name.split('_');
  let name = '';
  for (let i = 0; i < parts.length; i++) {
    const elem = parts[i];
    name += elem.charAt(0).toUpperCase() + elem.substr(1);
  }
  return name;
}

module.exports = {
  createFile,
  getName,
};
