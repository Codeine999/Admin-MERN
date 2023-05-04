import mongoose from "mongoose";
import bcrypt from "bcrypt";

const AdminSchema = new mongoose.Schema(
    {
        firstname: String,
        lastname: String,
        password: String,
        email: String,
        role: String,
        public_id: String, 
    },
    { timestamps: true }
);

AdminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      return next();
    }
  
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  });
  
  const Admin = mongoose.model("Admin", AdminSchema);
  
  export default Admin;