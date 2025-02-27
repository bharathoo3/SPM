const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password:{ type: String, required: true },
  Department:{type:String,required: true},
  Role:{type:String,required: true}
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher; // ✅ Export using CommonJS
