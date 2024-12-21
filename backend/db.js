import  mongoose from 'mongoose';

const PasswordSchema = new mongoose.Schema({
  url: { type: String, required: true },
  username: { type: String, required: true, },
  password: { type: String, required: true },
});

const Password=mongoose.model('Passwrod',PasswordSchema);

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true,index:true },
  password: { type: String, required: true },
UserPasswords: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Passwrod' }], // History of hashed passwords
});




const userModel=mongoose.model("users",userSchema);

export  {Password,userModel}
1