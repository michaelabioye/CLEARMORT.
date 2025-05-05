function getValues() {

    loanElement = document.getElementById('loanAmount');
    termElement = document.getElementById('termMonths');
    intrElement = document.getElementById('interestRate');




    let balance = parseInt(loanElement.value);
    let term = parseInt(termElement.value);
    let rate = parseFloat(intrElement.value);
    //'||' means or in if statements 

    if (Number.isNaN(balance) || Number.isNaN(term) || Number.isNaN(rate)
        || balance < 0 || term < 0 || rate < 0) {

        swal.fire({
            backdrop: false,
            title: 'uh oh',
            text: 'Please Enter Amount To View Payments ',
            icon: 'error'
        })
    } else if (Number.isInteger(balance) && Number.isInteger(term)
        && Number.isInteger(rate)) {

        let summary = mortgageLoan(balance, term, rate);
        displaySummary(summary);

        let completePayPlan = loopForPaymentPlan(balance, term, rate, summary.monthlyCost);
        displayPayments(completePayPlan)



    }

    /*The amount of money loaned in dollars (balance)
The time over which the loan will be repaid, in months (term)
The annual percentage rate at which interest will accrue on the loan (rate)*/


}


function mortgageLoan(balance, term, rate) {

    let monthlyPayment = ((balance) * (rate / 1200) / (1 - Math.pow(1 + rate / 1200, - term)))

    let remainingBalance = monthlyPayment * term;
    let interestPayment = remainingBalance - balance;
    let principalPayment = monthlyPayment - interestPayment;
    remainingBalance = remainingBalance - principalPayment;

    let summary = {
        totalPrincipal: balance,
        totalCost: balance + interestPayment,
        totalInterest: interestPayment,
        monthlyCost: monthlyPayment
    }


    return summary;

}

function loopForPaymentPlan(balance, term, rate) {

    let paymentPlan = []
    let remainingBalance = balance;
    let totalInterest = 0

    for (let month = 1; month <= term; month = month + 1) {
        // if statement is the middle part of the loop that keeps the loop going
        let monthlyAmount = ((balance) * (rate / 1200) / (1 - Math.pow(1 + rate / 1200, - term)))
        let interestPay = remainingBalance * rate / 1200;
        let principalPay = monthlyAmount - interestPay;

        remainingBalance = remainingBalance - principalPay;
        totalInterest = totalInterest + interestPay
        if (remainingBalance < 0) { remainingBalance = 0 }


        let paymentPlanSummary = {
            month: month,
            payment: monthlyAmount,
            principal: principalPay,
            interest: interestPay,
            totalInt: totalInterest,
            balance: remainingBalance
        }
        paymentPlan.push(paymentPlanSummary);
    }
    return paymentPlan;

}


function displaySummary(summary) {
    monthlyPayElement = document.getElementById('amountAMonth');
    totalPrincipalElement = document.getElementById('totalPrincipal');
    totalInterestElement = document.getElementById('totalInterest');
    totalCostElement = document.getElementById('totalCost');

    monthlyPayElement.innerText = ('$' + summary.monthlyCost.toFixed(2));
    totalPrincipalElement.innerText = ('$' + summary.totalPrincipal.toFixed(2));
    totalInterestElement.innerText = ('$' + summary.totalInterest.toFixed(2));
    totalCostElement.innerText = ('$' + summary.totalCost.toFixed(2))





}

function displayPayments(arrPaymentPlan) {
    let tablerowtemp = document.getElementById('tableTemplate');
    let paymentsTableElement = document.getElementById('paymentsTable')
    paymentsTableElement.innerHTML = '';


    for (let i = 0; i < arrPaymentPlan.length; i = i + 1) {
        let monthlyPayment = arrPaymentPlan[i];

        let tablerowEl = tablerowtemp.content.cloneNode(true);
        let monthTd = tablerowEl.querySelector('.month');
        monthTd.innerText = monthlyPayment.month;

        let paymentTd = tablerowEl.querySelector('.payment');
        paymentTd.innerText = monthlyPayment.payment.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

        let principalTd = tablerowEl.querySelector('.principal');
        principalTd.innerText = monthlyPayment.principal.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

        let interestTd = tablerowEl.querySelector('.interest');
        interestTd.innerText = monthlyPayment.interest.toFixed(2);

        let totalInterestTd = tablerowEl.querySelector('.total-interest');
        totalInterestTd.innerText = monthlyPayment.totalInt.toFixed(2);

        let balanceTd = tablerowEl.querySelector('.balance');
        balanceTd.innerText = monthlyPayment.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

        paymentsTableElement.appendChild(tablerowEl);



    }

}



/*<tr> THIS IS FOR MY JAVASCRIPT NOTES
            <td class="month"></td>
            <td class="payment"></td>
            <td class="principal"></td>
            <td class="interest"></td>
            <td class="total-interest"></td>
            <td class="balance"></td>
        </tr>*/
/*if ((loan) * (inter / 1200) / (1 - (1 + inter / 1200) ^ (-term))) {
             totalMonthly = ''*/

/*function getValues() {
                // other code...
            
                let loanSummary = calculateSummary(amount, months, rate);
                displaySummary(loanSummary);
            }*/

/*function calculateSummary(amount, months, rate) {
                // calculate monthly payment...
            
                let cost = payment * months;
                let interest = cost - amount;
            
                let summary = {
                    amount: amount,
                    totalCost: cost,
                    totalInterest: interest,
                    monthlyPayment: payment,
                };
                
                return summary;
            }
            
            function displaySummary(loanSummary) {
                // other code...
            
                // THIS WON'T WORK!
                monthlyPaymentElement.innerText = loanSummary;
                // loanSummary is an object, so it displays as "Object object"
            
                // note: innerText is set to be the specific property we want,
                // not the whole object. The values are accessed by name  
                monthlyPaymentElement.innerText = loanSummary.monthlyPayment;
                totalInterestElement.innerText = loanSummary.totalInterest;
                totalCostElement.innerText = loadnSummary.totalCost;
                loanAmountElement.innerText = loanSummary.amount;
            }*/