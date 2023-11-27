import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import Expense from "../models/expenseModel.js";

const authUser = asyncHandler(async (req, res) => {
    const { email, password, gmail } = req.body;
    if (gmail) {                                                          //google login
        const user = await User.findOne({ email: email })
        if (user) {
            generateToken(res, user._id);
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
            });
        } else {
            res.status(400)
            throw new Error("Invalid email")
        }
    } else {
        const user = await User.findOne({ email: email });

        if (user && (await user.matchPassword(password))) {
            generateToken(res, user._id);
            res.status(201).json({
                _id: user._id,
                email: user.email
            });
        } else {
            res.status(401);
            throw new Error("Invalid email or password");
        }
    }});

const registerUser = asyncHandler(async (req, res) => {
    const { email, password,gmail } = req.body;
    console.log("entered");
    if (gmail) {
        console.log(email);
        const userExist = await User.findOne({ email: email });
    
        if (userExist) {
          res.status(400);
          console.log("User already exist");
          throw new Error("User already exist");
        }
    
        const user = await User.create({
       
          email
        });
    
        if (user) {
          generateToken(res, user._id);
          res.status(201).json({
            _id: user._id,
      
            email: user.email,
          });
        } else {
          res.status(400);
          throw new Error("Invalid user data");
        }
      }
    const userExist = await User.findOne({ email: email });
    if (userExist) {
        res.status(400);
        throw new Error("User already exist");
    }

    const user = await User.create({

        email,
        password,
    });

    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,

            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

const logoutUser = asyncHandler(async (req, res) => {
    
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: "User Logged Out" });
});

const addExpense= asyncHandler(async(req,res)=>{
    
    const expense = await Expense.create({
        category:req.body.selectedValue,
        amount:req.body.amount,
        date:req.body.date
    });

    if (expense) {
        res.status(201).json({
          message: "Successfully created", 
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
})

const data = asyncHandler(async (req, res) => {
    try {
      const expenses = await Expense.find({});

      if (expenses) {
        res.status(201).json({
          data: expenses, // Assuming you want to send the expenses data
          message: "Successfully retrieved",
        });
      } else {
        res.status(400).json({
          message: "No data found",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  });
  

export {
    authUser,
    registerUser,
    logoutUser,
    addExpense,
    data
}