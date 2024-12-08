// const mongoose = require("mongoose");
// const AutoIncrement = require("mongoose-sequence")(mongoose);

// // Define the Budget schema
// const budgetSchema = new mongoose.Schema({
//   budgetName: {
//     type: String,
//     required: true,
//   },
//   emoji: {
//     type: String,
//     default: "💰",
//   },
//   expenseLimit: {
//     type: Number,
//     required: true,
//   },
//   totalSpent: {
//     type: Number,
//     default: 0,
//   },
//   expenses: [{
//     expenseName: String,
//     amount: Number,
//     date: {
//       type: Date,
//       default: Date.now
//     }
//   }],
// });


// // Add auto-incrementing ID field
// budgetSchema.plugin(AutoIncrement, { inc_field: "budgetId" });

// const Budget = mongoose.model("Budget", budgetSchema);

// module.exports = Budget;
const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const budgetSchema = new mongoose.Schema({
  budgetName: { type: String, required: true },
  emoji: { type: String, default: "💰" },
  expenseLimit: { type: Number, required: true },
  totalSpent: { type: Number, default: 0 },
  expenses: [
    {
      expenseName: String,
      amount: Number,
      date: { type: Date, default: Date.now },
    },
  ],
});

// Auto-increment ID
budgetSchema.plugin(AutoIncrement, { inc_field: "budgetId" });

const Budget = mongoose.model("Budget", budgetSchema);
module.exports = Budget;
