function getValues() {

    loanElement = document.getElementById('loanAmount');
    termElement = document.getElementById('termMonths');
    intrElement = document.getElementById('interestRate');

    let loan = parseInt(loanElement.value);
    let term = parseInt(termElement.value);
    let inter = parseFloat(intrElement.value);

    if (loan, term, inter, '') {

        swal.fire({
            backdrop: false,
            title: 'uh oh',
            text: 'Please Enter Amount To View Payments ',
            icon: 'error'
        })
    } else if (Number.isInteger(loan) && Number.isInteger(term)
        && !Number.isInteger(inter)) {

        let summaryCalc = calcSummary(loan, term, inter);

        displaySummary(summaryCalc);
    }

    /*The amount of money loaned in dollars (balance)
The time over which the loan will be repaid, in months (term)
The annual percentage rate at which interest will accrue on the loan (rate)*/


}


function calcSummary(loan, term, inter) {

    (loan) * (inter / 1200) / (1 - (1 + inter / 1200) ^ (-term))



    return calcSummary;

}



function displaySummary() {

}