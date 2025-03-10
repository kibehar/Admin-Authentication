import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    password: String
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
