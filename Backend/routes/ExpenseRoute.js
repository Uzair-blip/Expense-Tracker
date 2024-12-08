const express = require("express");
const Expense = require("../models/Expense");
const Budget = require("../models/Budget");

const router = express.Router();

// Add a new expense
router.post("/add-expense", async (req, res) => {
  const { budgetId, expenseName, amount } = req.body;

  try {
    if (!budgetId || !expenseName || !amount) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const budget = await Budget.findById(budgetId);
    if (!budget) {
      return res.status(404).json({ error: "Budget not found." });
    }

    // Create and save the expense
    const expense = new Expense({ budget: budgetId, expenseName, amount });
    await expense.save();

    // Update budget document
    budget.expenses.push({ expenseName, amount });
    budget.totalSpent += amount;

    await budget.save();

    res.status(201).json({ success: true, expense, budget });
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ error: "Server error." });
  }
});

// Fetch all expenses for a budget
router.get("/:budgetId", async (req, res) => {
  const { budgetId } = req.params;
  console.log("Received budgetId:", budgetId);


  try {
    const budget = await Budget.findById(budgetId).populate("expenses");
    if (!budget) {
      return res.status(404).json({ error: "Budget not found." });
    }

    res.status(200).json({ success: true, expenses: budget.expenses });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ error: "Server error." });
  }
})
// get all the expenses of all users  
router.get("/", async (req, res) => {

  try {
    const expense = await Expense.find({});
    if (!expense) {
      return res.status(404).json({ error: "expense not found." });
    }

    res.status(200).json({ success: true, expense});
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ error: "Server error." });
  }
});
// Delete an expense
// Delete an expense
router.delete("/delete-expense/:budgetId/:expenseId", async (req, res) => {
  const { budgetId, expenseId } = req.params; // Extract budgetId and expenseId from route parameters

  try {
    // Find the associated budget
    const budget = await Budget.findById(budgetId);
    if (!budget) {
      return res.status(404).json({ error: "Budget not found." });
    }

    // Find the expense in the budget
    const expense = budget.expenses.find((e) => e._id.toString() === expenseId);
    if (!expense) {
      return res.status(404).json({ error: "Expense not found in budget." });
    }

    // Remove the expense from the budget's expenses array
    budget.expenses = budget.expenses.filter((e) => e._id.toString() !== expenseId);

    // Update total spent
    budget.totalSpent -= expense.amount;

    // Save the updated budget
    await budget.save();

    // Delete the expense from the Expense collection
    await Expense.findByIdAndDelete(expenseId);

    res.status(200).json({ success: true, message: "Expense deleted successfully." });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ error: "Server error." });
  }
});



module.exports = router;
