import mongoose from "mongoose";

const expenseSchema = mongoose.Schema(
  {
    user:{
      type:String,
      required:true
    },
    category: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date:{
        type:Date,
        required:true
    }
  }  
);

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
