document.getElementById('loan-form').addEventListener('submit',function(e){
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
    setTimeout(calcResults, 2000);
    e.preventDefault();
});
//results
function calcResults(){
  console.log('Calculating...');
  const UIamt = document.getElementById('amount');
  const UIint = document.getElementById('interest');
  const UIyrs = document.getElementById('years');
  const UImonthlyPay = document.getElementById('monthly-payment');
  const UItotalPay = document.getElementById('total-payment');
  const UItotalInt = document.getElementById('total-interest');

  const principal = parseFloat(UIamt.value);
  const calcInt = parseFloat(UIint.value) / 100 / 12;
  const calcPay = parseFloat(UIyrs.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calcInt, calcPay);
  const monthly = (principal*x*calcInt)/(x-1);
  if(isFinite(monthly)) {
    UImonthlyPay.value = monthly.toFixed(2);
    UItotalPay.value = (monthly * calcPay).toFixed(2);
    UItotalInt.value = ((monthly * calcPay)-principal).toFixed(2);
    document.getElementById('results').style.display = 'block';
    document.getElementById('loading').style.display = 'none';
  } else {
    DisplayErrMsg('Error in the input Numbers');
  }
}
function DisplayErrMsg(error){
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'none';
    const errDiv = document.createElement('div');
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    errDiv.className = 'alert alert-danger';
    errDiv.appendChild(document.createTextNode(error));
    card.insertBefore(errDiv, heading);
    setTimeout(clearErr, 3000);
  }
function clearErr(){
    document.querySelector('.alert').remove();
  }

  
  