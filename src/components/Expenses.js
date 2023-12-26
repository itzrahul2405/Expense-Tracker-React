import { useRef, useState } from "react";
import classes from "./Expenses.module.css";

const Expenses = () => {
  const moneyInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();
  const [expenses, setExpenses] = useState([]);

  const addExpenseHandler = (event) => {
    event.preventDefault();
    setExpenses([
      ...expenses,
      {
        id: new Date().getTime(),
        category: categoryInputRef.current.value,
        description: descriptionInputRef.current.value,
        money: moneyInputRef.current.value,
      },
    ]);

    // Reset form values
    moneyInputRef.current.value = "";
    descriptionInputRef.current.value = "";
    categoryInputRef.current.value = "food"; // Reset to the default category
  };

  const deleteExpenseHandler = (Id) => {
    const updatedExpense = expenses.filter((item) => {
        return item.id !== Id;
    });
    
    setExpenses(updatedExpense)
  };

  const editExpenseHandler = (Id) => {
    const targetItem = expenses.find((item) => item.id === Id)
    deleteExpenseHandler(Id)
    moneyInputRef.current.value = targetItem.money;
    descriptionInputRef.current.value = targetItem.description;
    categoryInputRef.current.value = targetItem.category;
  };

  return (
    <>
      <form className={classes.expense_form} onSubmit={addExpenseHandler}>
        <div>
          <label htmlFor="money-spent">Money: </label>
          <input
            type="text"
            name="money-spent"
            id="money-spent"
            ref={moneyInputRef}
          />
        </div>
        <div>
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            name="description"
            id="description"
            ref={descriptionInputRef}
          />
        </div>
        <div>
          <label htmlFor="category">Category: </label>
          <select id="category" ref={categoryInputRef}>
            <option value="food">Food</option>
            <option value="petrol">Petrol</option>
            <option value="salary">Salary</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button>Add Expense</button>
      </form>

      <ul className={classes.expenses_list}>
        {expenses.map((expenseItem) => (
          <li key={expenseItem.id}>
            <p>{expenseItem.category}</p>
            <p>{expenseItem.description}</p>
            <p>${expenseItem.money}</p>
            <button onClick={() => deleteExpenseHandler(expenseItem.id)}>
              Delete
            </button>
            <button onClick={() => editExpenseHandler(expenseItem.id)}>Edit</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Expenses;
