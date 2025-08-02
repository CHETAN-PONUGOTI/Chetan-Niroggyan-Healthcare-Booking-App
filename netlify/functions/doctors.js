const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  // Assumes your db.json file is in the main root folder
  const dbPath = path.resolve(process.cwd(), 'db.json');

  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    const jsonData = JSON.parse(data);

    // This serves the content of your db.json file
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jsonData), 
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to read the database file.' }),
    };
  }
};