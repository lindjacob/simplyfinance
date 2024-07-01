import React, { useState, useEffect, useRef } from 'react';

const BudgetBar = ({ setEditing, income, expenses, budgets, setBudgets, headline, description }) => {
  const [displayMode, setDisplayMode] = useState('percentage');
  const containerElement = useRef(null);
  const budgetBlocksRef = useRef({});
  const budgetBlockPrevPageXRef = useRef(null);
  const [budgetBarWidth, setBudgetBarWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (containerElement.current) {
        setBudgetBarWidth(containerElement.current.offsetWidth);
      }
    };

    window.addEventListener('resize', updateWidth);
    updateWidth()

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const calculateWidth = ratio => {
    const numberOfResizers = Object.keys(budgets).length - 1;
    return (budgetBarWidth - 5 * numberOfResizers) * ratio + 'px';
  };

  const updateFreeAmount = () => {
    setBudgets(prevBudgets => {
      const newBudgets = { ...prevBudgets };
      let occupiedAmount = 0;
      for (const budget in budgets) {
        if (budget === 'freeAmount') {
          continue;
        }
        occupiedAmount += prevBudgets[budget]
      }
      newBudgets.freeAmount = 1 - occupiedAmount - (expenses / income)
      return newBudgets
    })
  }

  const resize = (e, budgetLabel) => {
    setEditing(true);
    let ratioChange = (e.pageX - budgetBlockPrevPageXRef.current) / budgetBarWidth;
    budgetBlockPrevPageXRef.current = e.pageX

    setBudgets(prevBudgets => {
      let updatedFreeAmount = prevBudgets.freeAmount - ratioChange;
      let updatedBudgetAmount = prevBudgets[budgetLabel] + ratioChange;
      const insufficientAmount = (ratioChange > 0 && prevBudgets.freeAmount === 0) || (ratioChange < 0 && prevBudgets[budgetLabel] === 0)

      if (ratioChange === 0 || insufficientAmount) {
        return prevBudgets;
      } else if (ratioChange > 0 && updatedFreeAmount <= 0) {
        ratioChange = prevBudgets.freeAmount;
        updatedFreeAmount = 0;
        updatedBudgetAmount = prevBudgets[budgetLabel] + ratioChange;
      } else if (ratioChange < 0 && updatedBudgetAmount <= 0) {
        ratioChange = prevBudgets[budgetLabel];
        updatedFreeAmount = prevBudgets.freeAmount + ratioChange;
        updatedBudgetAmount = 0;
      }

      let newBudgets = { ...prevBudgets };
      newBudgets.freeAmount = updatedFreeAmount;
      newBudgets[budgetLabel] = updatedBudgetAmount;
      return newBudgets;
    });
  }

  const controlBudgetBlock = (e, budgetLabel) => {
    budgetBlockPrevPageXRef.current = e.pageX;
    const resizeFunction = (e) => resize(e, budgetLabel)
    window.addEventListener('mousemove', resizeFunction);
    window.addEventListener('mouseup', () => {
      window.removeEventListener('mousemove', resizeFunction);
      budgetBlockPrevPageXRef.current = null;
    });
  }

  useEffect(() => {
    updateFreeAmount()
  }, [income, expenses, budgetBarWidth]);

  const renderBlock = (label, color, ratio) => (
    <div className='flex'>
      <div
        id={label.toLowerCase()}
        className={`${color} h-14 self-center`}
        ref={budgetBlock => {
          budgetBlocksRef.current[label.toLowerCase()] = {};
          budgetBlocksRef.current[label.toLowerCase()].budgetBlock = budgetBlock;
        }}
        style={{ width: calculateWidth(ratio) }}
      >
        <div className='flex flex-col' >
          <span>{label}</span>
          <span>{displayMode === 'percentage' ? `${(ratio * 100).toFixed(1)}%` : `${Math.round(ratio * income)}`}</span>
        </div>
      </div>
      <div
        className='relative right-0 top-0 rounded-sm cursor-ew-resize bg-primary w-1 z-10 h-full'
        ref={budgetBlock => { budgetBlocksRef.current[label.toLowerCase()].resizer = budgetBlock; }}
        onMouseDown={(e) => controlBudgetBlock(e, label.toLowerCase())}
      >
      </div>
    </div>
  );

  return (
    <div ref={containerElement} className="container flex flex-wrap justify-center">
      <div className='headerElement'>
        <div className='w-1/2'>
          <div className='headline'>{headline}</div>
          <div className='description'>{description}</div>
        </div>
        <div className='flex justify-end w-1/2'>
          <div className={`btn-sq ${displayMode === 'numeric' ? 'btn-focus' : ''}`} onClick={() => setDisplayMode('numeric')}>$</div>
          <div className={`btn-sq ${displayMode === 'percentage' ? 'btn-focus' : ''}`} onClick={() => setDisplayMode('percentage')}>%</div>
        </div>
      </div>
      <div className={`flex h-16 w-full text-center text-white`}>
        <div className='bg-rose-400 h-14 self-center' style={{ width: calculateWidth(expenses / income) }}>
          <div className='flex flex-col'>
            <span>Expenses</span>
            <span>{displayMode === 'percentage' ? `${((expenses / income) * 100).toFixed(1)}%` : `${expenses}`}</span>
          </div>
        </div>
        {renderBlock('Savings', 'bg-cyan-500', budgets.savings)}
        {renderBlock('Investment', 'bg-emerald-500', budgets.investment)}
        <div className='bg-amber-400 h-14 self-center' style={{ width: calculateWidth(budgets.freeAmount) }}>
          <div className='flex flex-col'>
            <span>Free Amount</span>
            <span>{displayMode === 'percentage' ? `${(budgets.freeAmount * 100).toFixed(1)}%` : `${Math.round(budgets.freeAmount * income)}`}</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default BudgetBar;