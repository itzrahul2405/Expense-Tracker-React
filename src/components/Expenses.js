import { useEffect, useRef, useState } from "react";
import classes from "./Expenses.module.css";

const Expenses = () => {
  const moneyInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();
  const [expenses, setExpenses] = useState([]);

  const addExpenseHandler = (event) => {
    event.preventDefault();

    fetch('https://expense-tracker-f0595-default-rtdb.firebaseio.com/expenses.json',{
        method: 'POST',
        body: JSON.stringify({category: categoryInputRef.current.value, description: descriptionInputRef.current.value, money: moneyInputRef.current.value,}),
        headers: {'Content-type': 'application/json'}
    })
    .then((resp) => {
        if(!resp.ok){
            throw new Error('Adding new expense failed!')
        }
        else{
            return resp.json()
        }
    })
    .then((data) => {
        console.log(data)
    })
    .catch(err => console.log(err.message))

    // Reset form values
    moneyInputRef.current.value = "";
    descriptionInputRef.current.value = "";
    categoryInputRef.current.value = "food"; // Reset to the default category
  };





  
  const getData = () => {
    fetch('https://expense-tracker-f0595-default-rtdb.firebaseio.com/expenses.json')
    .then((resp) => {
        if(!resp.ok){
            throw new Error('Something went wrong, can not get data!')
        }
        else{
            return resp.json()
        }
    })
    .then((data) => {
        // console.log(data)
        const fetchedDataValues = Object.values(data || {})
        const fetchedDataKeys = Object.keys(data || {})
        // console.log(fetchedDataValues)
        // console.log(fetchedDataKeys)
        let dataWithIds = [];
        for (let i=0; i<fetchedDataKeys.length; i++){
            dataWithIds =  [...dataWithIds, {id: fetchedDataKeys[i], ...fetchedDataValues[i]}]
        }
        // console.log(dataWithId)
        setExpenses(dataWithIds)
        getData()
    })
    .catch(err => console.log(err.message))
  }

  useEffect(() => {
    getData()
  }, [])





  const deleteExpenseHandler = (Id) => {
    fetch(`https://expense-tracker-f0595-default-rtdb.firebaseio.com/expenses/${Id}.json`,{
        method: 'DELETE'
    })
    .then(resp => {
        if(!resp.ok){
            throw new Error('something went wrong, failed to delete data!')
        }
        console.log(resp)
    })    
    .catch(err => console.log(err.message))
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
