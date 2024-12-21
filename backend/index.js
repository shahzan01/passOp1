import  express from 'express';
import  mongoose from 'mongoose';
import  dotenv from 'dotenv';
import  cors from 'cors';

import passwordRoutes from './routes/passwordRoutes.js';
import loginRouter from './routes/loginRoute.js';
dotenv.config({path:".env"});
const app = express();

app.use(cors());
app.use(express.json());










app.get("/api", (req, res) => {
  res.send("Hello World!");
});





app.use('/api/passwords', passwordRoutes);
app.use('/api/user/',loginRouter)
const PORT = process.env.PORT || 5000;
async function  main() {
  try{
   await mongoose.connect(process.env.MONGO_URI)
  console.log('MongoDB connected')

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  }
  catch{((err) => console.error(err))

  }



}


main()

