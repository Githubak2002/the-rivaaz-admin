import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema({
  task:{
    type:String,
    required:true
  },
  completed:{
    type:Boolean,
    default:false
  },
  // description:{
  //   type:String,
  //   required:false
  // },
},{
  timestamps:true
})

// Check if the model already exists
const TodoModel = mongoose.models.Todo || mongoose.model('Todo', todoSchema);


export default TodoModel;