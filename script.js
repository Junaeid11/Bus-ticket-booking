document.addEventListener('DOMContentLoaded', (event) => {
    let selectedSeats = [];
    const seatPrice = 100; // Assuming a seat costs $100
    const couponCode1 = "DISCOUNT10"; // First coupon code
    const couponCode2 = "DISCOUNT20"; // Second coupon code
    const discount1 = 0.15; // 10% discount for the first coupon
    const discount2 = 0.20; 
    let seatsLeft =40;
    

    function showSeatSelection() {
        document.querySelector('.hero').style.display = 'none';
        document.querySelector('#seatAndDetails').style.display = 'flex';
        document.getElementById('statisticsSection').classList.add('hidden');
        document.getElementById('noob').classList.add('hidden');
    }

    window.showSeatSelection = showSeatSelection;

    function selectSeat(seatElement) {
        const seatNumber = seatElement.innerHTML;
        if (selectedSeats.includes(seatNumber)) {
            selectedSeats = selectedSeats.filter(seat => seat !== seatNumber);
            seatElement.classList.remove('selected');
            seatsLeft++; 
        } else {
            selectedSeats.push(seatNumber);
            seatElement.classList.add('selected');
            seatsLeft--;
        }
        updateSeatCount();
        updateSummary();
    }
    
    function updateSeatCount(){
        document.getElementById('seat-count').innerHTML=seatsLeft;
    }

    window.selectSeat = selectSeat;

    function updateSummary() {
        document.getElementById('selectedSeats').textContent = selectedSeats.join('') || 'None';
        const totalPrice = selectedSeats.length * seatPrice;
        document.getElementById('totalPrice').textContent = `$${totalPrice}`;
        document.getElementById('reviewSeats').textContent = selectedSeats.join(', ') || 'None';
        document.getElementById('reviewAmount').textContent = totalPrice;
    }

    function applyCoupon() {
        const enteredCode = document.getElementById('couponCode').value;
        const couponMessage = document.getElementById('couponMessage');
        const couponErrorMessage = document.getElementById('couponErrorMessage');
        const totalPrice = selectedSeats.length * seatPrice;
        let discountedPrice = totalPrice;
    
        if (enteredCode === couponCode1) {
            discountedPrice = totalPrice - (totalPrice * discount1);
            couponMessage.textContent = `Coupon applied! You saved 10%.`;
            couponMessage.style.display = 'block';
            couponErrorMessage.style.display = 'none';
        } else if (enteredCode === couponCode2) {
            discountedPrice = totalPrice - (totalPrice * discount2);
            couponMessage.textContent = `Coupon applied! You saved 20%.`;
            couponMessage.style.display = 'block';
            couponErrorMessage.style.display = 'none';
        } else {
            couponErrorMessage.style.display = 'block';
            couponMessage.style.display = 'none';
        }
        document.getElementById('totalPrice').textContent = ` ৳${discountedPrice.toFixed(2)}`;
        document.getElementById('reviewAmount').textContent = discountedPrice.toFixed(2);
    }

    window.applyCoupon = applyCoupon;

    function openPaymentPopup() {
        const customerName = document.getElementById('customerName').value;
        const customerEmail = document.getElementById('customerEmail').value;
        
        if (selectedSeats.length === 0 || !customerName || !customerEmail) {
            showErrorPopup('Please select seats, enter your name and email.');
            return;
        }


        document.getElementById('paymentPopup').style.display = 'flex';
    }

    window.openPaymentPopup = openPaymentPopup;

    function closePaymentPopup() {
        document.getElementById('paymentPopup').style.display = 'none';
    }

    window.closePaymentPopup = closePaymentPopup;

    function confirmPayment() {
        document.getElementById('successMessage').classList.remove('hidden');
        closePaymentPopup();
        setTimeout(() => {
            window.location.reload();
        }, 3000); // Hide success message and reload page after 3 seconds
    }

    window.confirmPayment = confirmPayment;

    function closeSuccessMessage() {
        document.getElementById('successMessage').classList.add('hidden');
        window.location.reload(); // Reload the page after closing the success message
    }

    window.closeSuccessMessage = closeSuccessMessage;

    function showErrorPopup(message) {
        document.getElementById('errorMessage').textContent = message;
        document.getElementById('errorPopup').style.display = 'flex';
    }

    window.showErrorPopup = showErrorPopup;

    function closeErrorPopup() {
        document.getElementById('errorPopup').style.display = 'none';
    }

    window.closeErrorPopup = closeErrorPopup;
});
