// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
const key = urlParams.get('key'); // Optional: for advanced usage

// Success message function
function showSuccessMessage() {
  const message = document.getElementById('successMessage');
  message.classList.add('show');
  setTimeout(() => {
    message.classList.remove('show');
  }, 3000);
}

// Main function to send data to Firebase
function sendToApp() {
  const submitBtn = document.getElementById('submitBtn');
  const kNameInput = document.getElementById('kName');
  const eNameInput = document.getElementById('eName');
  
  // Check if key parameter exists
  if (!key) {
    alert('❌ No key parameter found in URL. Please add ?key=yourkey to the URL');
    return;
  }
  
  // Show loading state
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;
  submitBtn.innerHTML = 'Sending...';
  
  const data = {
    kName: kNameInput.value,
    eName: eNameInput.value
  };
  
  fetch(`https://temp-register-student-default-rtdb.asia-southeast1.firebasedatabase.app/forms/${key}.json`, {
    method: "PUT",
    body: JSON.stringify(data)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(() => {
    // Show success message
    showSuccessMessage();
    
    // Clear form
    kNameInput.value = "";
    eNameInput.value = "";
    
    // Reset button state
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
    submitBtn.innerHTML = '🚀 Send to Windows';
  })
  .catch(error => {
    console.error('Error:', error);
    alert('❌ Failed to send data. Please try again.');
    
    // Reset button state
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
    submitBtn.innerHTML = '🚀 Send to Windows';
  });
}

// Add input validation feedback when page loads
document.addEventListener('DOMContentLoaded', function() {
  const inputs = document.querySelectorAll('input');
  
  inputs.forEach(input => {
    // Validation on blur (when user leaves input field)
    input.addEventListener('blur', function() {
      if (this.value.trim() === '') {
        this.style.borderColor = '#ef4444';
      } else {
        this.style.borderColor = '#10b981';
      }
    });
    
    // Reset border color when user starts typing
    input.addEventListener('input', function() {
      if (this.style.borderColor === 'rgb(239, 68, 68)') {
        this.style.borderColor = '#e5e7eb';
      }
    });
  });
});