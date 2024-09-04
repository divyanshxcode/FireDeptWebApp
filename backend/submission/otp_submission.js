async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    if (response.ok) {
        alert('OTP sent to your email');
        document.getElementById('otpSection').style.display = 'block';
    } else {
        alert('Login failed');
    }
}

async function verifyOtp() {
    const email = document.getElementById('email').value;
    const otp = document.getElementById('otp').value;

    const response = await fetch('/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
    });

    if (response.ok) {
        alert('OTP verified successfully');
        // Redirect to the next interface
    } else {
        alert('Invalid OTP');
    }
}
