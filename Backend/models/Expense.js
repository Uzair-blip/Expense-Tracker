// const mongoose = require("mongoose");

// // Define the Expense schema
// const expenseSchema = new mongoose.Schema({
//   budget: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Budget",
//     required: true,
//   },
//   expenseName: {
//     type: String,
//     required: true,
//   },
//   amount: {
//     type: Number,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// // Create the Expense model
// const Expense = mongoose.model("Expense", expenseSchema);

// module.exports = Expense;
const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  budget: { type: mongoose.Schema.Types.ObjectId, ref: "Budget", required: true },
  expenseName: { type: String, required: true },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Expense = mongoose.model("Expense", expenseSchema);
module.exports = Expense;
