const app = require('../app');
const db = require('../lib/db');

const PORT = process.env.PORT || 3000

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: http://localhost:${PORT}`);
  })
}).catch((err) => {
  console.log(`Oops, server not responding. Error: ${err.message}`);
})

