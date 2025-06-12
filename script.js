// Get key from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const key = urlParams.get('key');

// Get form elements
const form = document.getElementById('registrationForm');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');

// Hide messages initially
function hideMessages() {
  successMessage.style.display = 'none';
  errorMessage.style.display = 'none';
}

// Show success message
function showSuccess() {
  hideMessages();
  successMessage.style.display = 'block';
  setTimeout(hideMessages, 5000);
}

// Show error message
function showError() {
  hideMessages();
  errorMessage.style.display = 'block';
  setTimeout(hideMessages, 5000);
}

// Get selected gender value
function getSelectedGender() {
  const genderSelect = document.getElementById('gender');
  return genderSelect.value;
}

// Send data to Firebase
async function sendToApp() {
  if (!key) {
    alert('No key parameter found in URL. Please check the link.');
    return;
  }

  // Show loading state
  submitBtn.classList.add('loading');
  submitBtn.textContent = '';

  const data = {
    kName: document.getElementById("kName").value.trim(),
    eName: document.getElementById("eName").value.trim(),
    gender: getSelectedGender(),
    timestamp: new Date().toISOString()
  };

  try {
    const response = await fetch(`https://temp-register-student-default-rtdb.asia-southeast1.firebasedatabase.app/forms/${key}.json`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      showSuccess();
      // Clear form
      document.getElementById("kName").value = "";
      document.getElementById("eName").value = "";
      document.getElementById("gender").value = "";
    } else {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('Error:', error);
    showError();
  } finally {
    // Remove loading state
    submitBtn.classList.remove('loading');
    submitBtn.textContent = 'Send to App';
  }
}

// Handle form submission
form.addEventListener('submit', function(e) {
  e.preventDefault();
  sendToApp();
});

// Add interactive feedback for inputs
const inputs = document.querySelectorAll('input[type="text"], select');
inputs.forEach(input => {
  input.addEventListener('focus', function() {
    this.parentElement.style.transform = 'scale(1.01)';
  });
  
  input.addEventListener('blur', function() {
    this.parentElement.style.transform = 'scale(1)';
  });
});

// Initialize - hide messages on page load
document.addEventListener('DOMContentLoaded', function() {
  hideMessages();
});