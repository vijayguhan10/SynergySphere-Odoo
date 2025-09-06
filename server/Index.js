const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const messageRoutes = require('./routes/messageRoutes');

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/messages', messageRoutes);

app.listen(8000, () => console.log('Server running on port 8000'));

app.get('/', (req, res) => {
    res.send('<h1>Server is running!</h1><p>Welcome to the SynergeSphere API</p>');
});