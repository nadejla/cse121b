/* Declare and initialize global variables */
const budgetInfoElement = document.querySelector('#budget')
const budgetTableElement = document.querySelector('#budget-table');
let transactionsList = [];
let condensedList = [];
let accountCodes = [];

/* async displaybudget Function */
const displayBudget = async (transactions) => {
    let obdAbdSum = 0;
    let revenueSum = 0;
    let expensesSum = 0;
    let obdAbdEnd = 0
    transactions.forEach(transaction => {
        if (transaction.Field.includes('OBD') || transaction.Field.includes('ABD')) {
            obdAbdSum += parseFloat(transaction.TotalAmount);
        }
        else {
            if (Number(transaction.Account) > 599999) {
                expensesSum += parseFloat(transaction.TotalAmount)
            }
            else {
                revenueSum += parseFloat(transaction.TotalAmount)
            }
            obdAbdEnd = obdAbdSum + revenueSum - expensesSum
        }
    });
    // Create and append sum element
    let sumElement = document.createElement('div');
    sumElement.innerHTML = `Your starting budget for FY2023-2024 is ${obdAbdSum.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
    <br>Total revenue: ${revenueSum.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
    <br>Total expenses: ${expensesSum.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
    <br>Remaining budget is ${obdAbdEnd.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
    <br><br>View Summary of Accounts below:`;
    budgetInfoElement.appendChild(sumElement);
};

const displayTransactions = async (transactions) => {
    let table = document.createElement('table');
    let tbody = document.createElement('tbody');
    let cols = Object.keys(transactions[0]);
    let thead = document.createElement('thead');
    let trHead = document.createElement('tr');
    cols.forEach((item) => {
        let th = document.createElement('th');
        th.innerText = item;
        trHead.appendChild(th);
    });
    thead.appendChild(trHead);
    table.appendChild(thead);
    
    await getCodes();
    const descriptionsPromises = transactions.map(transaction => {
        const accountCode = Number(transaction.Account);
        return getAccountDescription(accountCode);
    });

    Promise.all(descriptionsPromises).then(descriptions => {
        transactions
            .filter(transaction => !transaction.Field.includes('OBD') && !transaction.Field.includes('ABD'))
            .forEach((transaction, idx) => {
                let tr = document.createElement('tr');
                let vals = Object.values(transaction);
                vals.forEach((elem, index) => {
                    let td = document.createElement('td');
                    if (index === vals.length - 1 && !isNaN(elem)) {
                        elem = parseFloat(elem).toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        });
                        td.style.textAlign = 'right';
                        td.innerText = elem;
                    } else if (index === 0) {
                        const accountCode = Number(transaction.Account);
                        const accountDescription = descriptions[idx];
                        td.style.textAlign = 'left';
                        td.innerText = `${accountCode} - ${accountDescription}`;
                    } else {
                        td.innerText = elem;
                    }
                    tr.appendChild(td);
                });
                tbody.appendChild(tr);
            });
        table.appendChild(tbody);
        budgetTableElement.appendChild(table);
    });
};

const condenseTransactions = (transactions) => {
    const condensedMap = new Map(); 
    transactions.forEach(transaction => {
        const key = `${transaction.Account}-${transaction.Fund}-${transaction.Activity}-${transaction.Field}`
        if (!condensedMap.has(key)) {
            condensedMap.set(key, {
                Account: transaction.Account,
                // Fund: transaction.Fund,
                Activity: transaction.Activity,
                Field: transaction.Field,
                TotalAmount: 0
            });
        } 
        condensedMap.get(key).TotalAmount += parseFloat(transaction.Amount);        
    });
    condensedList = Array.from(condensedMap.values()).map(item => ({
        ...item,
        TotalAmount: parseFloat(item.TotalAmount.toFixed(2))
    }));
};

/* async getTransactions Function using fetch()*/

const getTransactions = async () => {
    const response = await fetch('data/fgitrnd.json');
    transactionsList = await response.json();
    condenseTransactions(transactionsList);
    displayBudget(condensedList)
    displayTransactions(condensedList);
};

const getCodes = async () => {
    const response = await fetch('data/accountcodes.json');
    accountCodes = await response.json();
    accountCodes.forEach(account => {
    })
};

// const workableAccounts = (accounts) => {
//     accounts.forEach(account => {
//         const key = `${account.Code}`
//     });
// };

const getAccountDescription = async (code) => {
    try {
        const account = accountCodes.find(account => account.Code === code);
        if (account) {
            return account.Description;
        } else {
            throw new Error('Account not found');
        }
    } catch (error) {
        console.error(error);
        return 'Description Not Found';
    }
}


/* reset Function */
function reset() {
    budgetInfoElement.innerHTML = '';
    budgetTableElement.innerHTML = '';
};

/* filterTransactions Function */

function filterTransactions(transactions) {
    reset();
    let filter = document.querySelector('#filtered').value;
    // let filteredTransactions = [];
    switch (filter) {
        case "athletics":
            let ydo010 = transactions.filter(transaction => transaction.Activity.includes('YDO010'))
            console.log(ydo010);
            displayBudget(ydo010)
            displayTransactions(ydo010);
            break;
        case "chps":
            let ydo011 = transactions.filter(transaction => transaction.Activity.includes('YDO011'))
            console.log(ydo011);
            displayBudget(ydo011)
            displayTransactions(ydo011);
            break;
        case "soe":
            let ydo012 = transactions.filter(transaction => transaction.Activity.includes('YDO012'))
            console.log(ydo012);
            displayBudget(ydo012)
            displayTransactions(ydo012);
            break;
        case "chss":
            let ydo013 = transactions.filter(transaction => transaction.Activity.includes('YDO013'))
            console.log(ydo013);
            displayBudget(ydo013)
            displayTransactions(ydo013);
            break;
        case "soa":
            let ydo014 = transactions.filter(transaction => transaction.Activity.includes('YDO014'))
            console.log(ydo014);
            displayBudget(ydo014)
            displayTransactions(ydo014);
            break;
        case "stdaff":
            let ydo015 = transactions.filter(transaction => transaction.Activity.includes('YDO015'))
            console.log(ydo015);
            displayBudget(ydo015)
            displayTransactions(ydo015);
            break;
        case "wsb":
            let ydo016 = transactions.filter(transaction => transaction.Activity.includes('YDO016'))
            console.log(ydo016);
            displayBudget(ydo016)
            displayTransactions(ydo016);
            break;
        case "science":
            let ydo017 = transactions.filter(transaction => transaction.Activity.includes('YDO017'))
            console.log(ydo017);
            displayBudget(ydo017)
            displayTransactions(ydo017);
            break;
        case "cet":
            let ydo018 = transactions.filter(transaction => transaction.Activity.includes('YDO018'))
            console.log(ydo018);
            displayBudget(ydo018)
            displayTransactions(ydo018);
            break;
        case "acaff":
            let ydo019 = transactions.filter(transaction => transaction.Activity.includes('YDO019'))
            console.log(ydo019);
            displayBudget(ydo019)
            displayTransactions(ydo019);
            break;
        case "general":
            let ydo020 = transactions.filter(transaction => transaction.Activity.includes('YDO020'))
            console.log(ydo020);
            displayBudget(ydo020)
            displayTransactions(ydo020);
            break;
        case "all":
            console.log(transactions)
            displayBudget(transactions)
            displayTransactions(transactions);
            break;
    }
};

/* Event Listener */

document.querySelector('#filtered').addEventListener('change', () => { filterTransactions(condensedList) });

getCodes();
getTransactions();