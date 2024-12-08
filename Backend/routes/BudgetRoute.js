const express = require("express");
const Budget = require("../models/Budget");

const router = express.Router();

// Create a new budget
router.post("/create", async (req, res) => {
  try {
    const { budgetName, expenseLimit, emoji } = req.body;
    if (!budgetName || !expenseLimit) {
      return res.status(400).json({ error: "budgetName and expenseLimit are required." });
    }

    const newBudget = new Budget({ budgetName, expenseLimit, emoji });
    await newBudget.save();
    res.status(201).json({ success: true, budget: newBudget });
  } catch (error) {
    console.error("Error creating budget:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all budgets
router.get("/", async (req, res) => {
  try {
    const budgets = await Budget.find({});
    res.status(200).json(budgets);
  } catch (error) {
    console.error("Error fetching budgets:", error);
    res.status(500).json({ message: "Server error" });
  }
});
// In your Express API (e.g., routes/budgets.js)
router.get("/expenses/:budgetId", async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.budgetId);
    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }
    res.json(budget.expenses); // Send the list of expenses
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "Error fetching expenses" });
  }
});

// Get a budget by ID
router.get("/:id", async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);
    if (!budget) {
      return res.status(404).json({ error: "Budget not found." });
    }
    res.status(200).json(budget);
  } catch (error) {
    console.error("Error fetching budget by ID:", error);
    res.status(500).json({ error: "Server error." });
  }
});

// Delete a budget
router.delete("/:id", async (req, res) => {
  try {
    const budget = await Budget.findByIdAndDelete(req.params.id);
    if (!budget) {
      return res.status(404).json({ error: "Budget not found." });
    }
    res.status(200).json({ success: true, message: "Budget deleted successfully." });
  } catch (error) {
    console.error("Error deleting budget:", error);
    res.status(500).json({ error: "Server error." });
  }
});
// update 
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { budgetName, expenseLimit, emoji } = req.body;

    // Validate required fields
    if (!budgetName && !expenseLimit && !emoji) {
      return res.status(400).json({ error: "At least one field is required to update." });
    }

    // Find the budget by ID and update the provided fields
    const updatedBudget = await Budget.findByIdAndUpdate(
      id,
      { budgetName, expenseLimit, emoji },
      { new: true, runValidators: true } // Return the updated document
    );

    if (!updatedBudget) {
      return res.status(404).json({ error: "Budget not found." });
    }

    res.status(200).json({ success: true, budget: updatedBudget });
  } catch (error) {
    console.error("Error updating budget:", error);
    res.status(500).json({ error: "Server error. Unable to update budget." });
  }
});

module.exports = router;
