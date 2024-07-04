"use client";

import React, { useEffect, useState } from "react";
import Banner from "@/components/Banner";
import Chart from "@/components/Chart";
import BudgetBar from "@/components/BudgetBar";
import InputField from "@/components/InputField";

export default function Index() {
  const [editing, setEditing] = useState(false);
  const [income, setIncome] = useState(3200);
  const [expenses, setExpenses] = useState(1300);
  const [budgets, setBudgets] = useState({
    savings: 0.1,
    investment: 0.2,
    freeAmount: 1 - expenses / income - 0.3,
  });
  const [prevBudgets, setPrevBudgets] = useState(budgets);

  useEffect(() => {
    if (editing) {
      setPrevBudgets(budgets);
    }
  }, [editing]);

  return (
    <div className="flex justify-center bg-gray-50 caret-transparent select-none">
      <Banner
        editing={editing}
        setEditing={setEditing}
        prevBudgets={prevBudgets}
        setBudgets={setBudgets}
      />

      <main className="max-w-[1500px] grid grid-cols-2 grid-rows-custom-3 gap-3 auto-cols-min mx-20 mt-10 h-screen">
        <div className="col-span-2 flex justify-between container">
          <div>
            <h1 className="h1">Simple Finance Planner</h1>
            <p className="description">
              Add your income and expenses to start planning your finances
            </p>
          </div>
          <div className="flex">
            <InputField
              name="Income"
              value={income}
              onChange={(e) => setIncome(parseFloat(e.target.value))}
            />
            <InputField
              name="Expenses"
              value={expenses}
              onChange={(e) => setExpenses(parseFloat(e.target.value))}
            />
          </div>
          {/* <InputField name="Initial investment amount" value={initialInvestment} onChange={(e) => setInitialInvestment(e.target.value)} type="number" /> */}
        </div>

        <div className="col-span-2">
          <BudgetBar
            setEditing={setEditing}
            income={income}
            expenses={expenses}
            budgets={budgets}
            // prevBudgets={prevBudgets}
            setBudgets={setBudgets}
            // setPrevBudgets={setPrevBudgets}
            headline={"Income Allocation"}
            description={
              "Set your income allocation by adjusting the size of the individual account allocations"
            }
          />
        </div>

        <div className="col-span-1">
          <Chart
            editing={editing}
            income={income}
            budgets={budgets}
            prevBudgets={prevBudgets}
            budgetLabel={"investment"}
            headline={"Investment Forecast"}
            description={
              "The graph shows you the yearly growth of your invetment account with an annual 7% increase"
            }
          />
        </div>

        <div className="col-span-1">
          <Chart
            editing={editing}
            income={income}
            budgets={budgets}
            prevBudgets={prevBudgets}
            budgetLabel={"savings"}
            headline={"Savings Forecast"}
            description={
              "The graph shows you the yearly growth of your savings account"
            }
          />
        </div>
      </main>

      <footer>{/* Footer content goes here */}</footer>
    </div>
  );
}
