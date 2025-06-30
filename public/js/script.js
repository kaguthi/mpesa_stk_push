/* eslint-disable no-undef */
const phoneInput = document.getElementById('phone')
    amountInput = document.getElementById('amount')
    submitBtn = document.getElementById('submit')
    form = document.getElementById('form')
    host = window.location.origin;

submitBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    const phone = phoneInput.value
    const amount = amountInput.value
    const data = { phone, amount }
    const response = await fetch(`${host}/api/stk-push`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const res = await response.json();
    if (res.status === 'success') {
        alert('Payment request sent successfully')
        form.reset();
    } else {
        alert("An Error occurred due to" + JSON.stringify(res.error.errorMessage))
    }
})