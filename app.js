const express = require('express');
const app = express();

app.get('/health', (req, res) => res.send('OK'));

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Node.js API!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
