import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import passwordRoutes from './routes/passwordRoutes.js';
import loginRouter from './routes/loginRoute.js';

dotenv.config({ path: '.env' });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api', (req, res) => {
    res.send('Hello World! api');
});

app.use('/api/passwords', passwordRoutes);
app.use('/api/user/', loginRouter);

// Server Initialization
const PORT = process.env.PORT || 5000;

async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');

        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (err) {
        console.error(err); // Ensure error details are logged
    }
}

main();
