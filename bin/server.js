const { mkdir } = require('fs/promises')
const app = require('../app');
const db = require('../lib/db');
require('dotenv').config()

const PORT = process.env.PORT || 3000

db.then(() => {
  app.listen(PORT, async () => {
    await mkdir(process.env.UPLOAD_DIR, {recursive: true})
    console.log(`Server running. Use our API on port: http://localhost:${PORT}`);
  })
}).catch((err) => {
  console.log(`Oops, server not responding. Error: ${err.message}`);
})

