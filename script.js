const translations = {
  kh: {
      title: 'ការចុះឈ្មោះសិស្ស',
      subtitle: 'សូមបំពេញព័ត៌មានខាងក្រោមឱ្យបានត្រឹមត្រូវ',
      success: '✅ បានផ្ញើទិន្នន័យទៅកម្មវិធី Windows បានជោគជ័យ!',
      error: '❌ មិនអាចផ្ញើទិន្នន័យបានទេ។ សូមព្យាយាមម្តងទៀត។',
      initialQuestion: 'តើអ្នកធ្លាប់ចុះឈ្មោះកូនរៀនសាលាយើងពីមុនមកទេ?',
      yes: 'បាទ/ចាស',
      no: 'ទេ',
      studentDetails: 'ព័ត៌មានសិស្ស',
      parentDetails: 'ព័ត៌មានឪពុកម្តាយ',
      khmerName: 'ឈ្មោះជាភាសាខ្មែរ',
      englishName: 'ឈ្មោះជាភាសាអង់គ្លេស',
      gender: 'ភេទ',
      dateOfBirth: 'ថ្ងៃខែឆ្នាំកំណើត',
      studentPhone: 'លេខទូរស័ព្ទសិស្ស',
      previousSchool: 'សាលារៀនចាស់',
      photo: 'រូបថត',
      fatherName: 'ឈ្មោះឪពុក',
      fatherPhone: 'លេខទូរស័ព្ទឪពុក',
      fatherJob: 'មុខរបរឪពុក',
      motherName: 'ឈ្មោះម្តាយ',
      motherPhone: 'លេខទូរស័ព្ទម្តាយ',
      motherJob: 'មុខរបរម្តាយ',
      province: 'ខេត្ត',
      district: 'ស្រុក',
      commune: 'ឃុំ',
      village: 'ភូមិ',
      email: 'អ៊ីមែល',
      optional: '(ស្រេច)',
      submitBtn: 'ផ្ញើទៅកម្មវិធី',
      khmerNameError: 'សូមបញ្ចូលឈ្មោះជាភាសាខ្មែរតែប៉ុណ្ណោះ',
      englishNameError: 'សូមបញ្ចូលឈ្មោះជាភាសាអង់គ្លេសតែប៉ុណ្ណោះ',
      emailError: 'សូមបញ្ចូលអ៊ីមែលត្រឹមត្រូវ',
      // --- New Translations for Expiration ---
      linkExpired: 'តំណភ្ជាប់នេះបានផុតកំណត់ហើយ។ សូមទាក់ទងអ្នកគ្រប់គ្រងដើម្បីទទួលបានតំណភ្ជាប់ថ្មី។',
      missingParams: 'តំណភ្ជាប់មិនត្រឹមត្រូវ។ រកមិនឃើញ key ឬ expiry parameter ទេ។',
      fillRequired: 'សូមបំពេញព័ត៌មានដែលចាំបាច់ឱ្យបានត្រឹមត្រូវ'
  },
  en: {
      title: 'Student Registration',
      subtitle: 'Please fill in the information below accurately',
      success: '✅ Successfully sent to Windows App!',
      error: '❌ Failed to send data. Please try again.',
      initialQuestion: 'Have you ever registered your child at our school before?',
      yes: 'Yes',
      no: 'No',
      studentDetails: 'Student Details',
      parentDetails: 'Parent Details',
      khmerName: 'Khmer Name',
      englishName: 'English Name',
      gender: 'Gender',
      dateOfBirth: 'Date of Birth',
      studentPhone: 'Student Phone',
      previousSchool: 'Previous School',
      photo: 'Photo',
      fatherName: 'Father Name',
      fatherPhone: 'Father Phone',
      fatherJob: 'Father Job',
      motherName: 'Mother Name',
      motherPhone: 'Mother Phone',
      motherJob: 'Mother Job',
      province: 'Province',
      district: 'District',
      commune: 'Commune',
      village: 'Village',
      email: 'Email',
      optional: '(Optional)',
      submitBtn: 'Send to App',
      khmerNameError: 'Please enter Khmer characters only',
      englishNameError: 'Please enter English characters only',
      emailError: 'Please enter a valid email address',
      // --- New Translations for Expiration ---
      linkExpired: 'This link has expired. Please contact the administrator for a new link.',
      missingParams: 'Invalid link. Missing key or expiry parameter.',
      fillRequired: 'Please fill in all required information correctly'
  }
};

let currentLang = 'kh';
let hasRegisteredBefore = null;

// DOM Elements
const langButtons = document.querySelectorAll('.lang-btn');
const initialQuestion = document.getElementById('initialQuestion');
const studentCard = document.getElementById('studentCard');
const parentCard = document.getElementById('parentCard');
const submitSection = document.getElementById('submitSection');
const choiceButtons = document.querySelectorAll('.choice-btn');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');

// --- Link Validation Logic ---
function isLinkValid() {
  const urlParams = new URLSearchParams(window.location.search);
  const key = urlParams.get('key');
  const expiry = urlParams.get('expiry');

  if (!key || !expiry) {
      return { valid: false, reason: 'missingParams' };
  }

  const expirationTime = parseInt(expiry, 10);
  const currentTime = new Date().getTime();

  if (isNaN(expirationTime) || currentTime > expirationTime) {
      return { valid: false, reason: 'linkExpired' };
  }

  return { valid: true, reason: null };
}

function disableForm(reason) {
  alert(translations[currentLang][reason]);
  // Hide all form sections
  initialQuestion.style.display = 'none';
  studentCard.classList.add('hidden');
  parentCard.classList.add('hidden');
  submitSection.classList.add('hidden');
  
  // Show a message on the page itself
  const container = document.querySelector('.container');
  const expiredMsg = document.createElement('div');
  expiredMsg.className = 'message error';
  expiredMsg.style.display = 'block';
  expiredMsg.textContent = translations[currentLang][reason];
  container.appendChild(expiredMsg);
}

// Language switching
langButtons.forEach(btn => {
  btn.addEventListener('click', () => {
      langButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentLang = btn.dataset.lang;
      updateLanguage();
  });
});

// Update language
function updateLanguage() {
  document.querySelectorAll('[data-text]').forEach(element => {
      const key = element.dataset.text;
      if (translations[currentLang][key]) {
          element.textContent = translations[currentLang][key];
      }
  });
}

// Choice button handlers
choiceButtons.forEach(btn => {
  btn.addEventListener('click', () => {
      choiceButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      hasRegisteredBefore = btn.dataset.choice === 'yes';
      showForms();
  });
});

// Show forms based on choice
function showForms() {
  initialQuestion.style.display = 'none';
  studentCard.classList.remove('hidden');
  studentCard.classList.add('fade-in');
  
  if (!hasRegisteredBefore) {
      setTimeout(() => {
          parentCard.classList.remove('hidden');
          parentCard.classList.add('fade-in');
      }, 300);
  }
  
  setTimeout(() => {
      submitSection.classList.remove('hidden');
      submitSection.classList.add('fade-in');
  }, hasRegisteredBefore ? 300 : 600);
}

// Validation functions
function isKhmerText(text) { return /^[\u1780-\u17FF\s]+$/.test(text.trim()); }
function isEnglishText(text) { return /^[a-zA-Z\s]+$/.test(text.trim()); }
function validateEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
function isValidPhone(phone) { return /^[0-9]*$/.test(phone); }

// Input validation event listeners
document.getElementById('kName').addEventListener('input', function() {
  const value = this.value;
  const errorDiv = this.nextElementSibling;
  if (value && !isKhmerText(value)) {
      this.classList.add('error');
      errorDiv.style.display = 'block';
  } else {
      this.classList.remove('error');
      errorDiv.style.display = 'none';
      if (value) this.classList.add('success');
  }
});

document.getElementById('eName').addEventListener('input', function() {
  const value = this.value;
  const errorDiv = this.nextElementSibling;
  if (value && !isEnglishText(value)) {
      this.classList.add('error');
      errorDiv.style.display = 'block';
  } else {
      this.classList.remove('error');
      errorDiv.style.display = 'none';
      if (value) this.classList.add('success');
  }
});

document.getElementById('email').addEventListener('input', function() {
  const value = this.value;
  const errorDiv = this.nextElementSibling;
  if (value && !validateEmail(value)) {
      this.classList.add('error');
      errorDiv.style.display = 'block';
  } else {
      this.classList.remove('error');
      errorDiv.style.display = 'none';
      if (value) this.classList.add('success');
  }
});

const phoneFields = ['studentPhone', 'fatherPhone', 'motherPhone'];
phoneFields.forEach(fieldId => {
  const field = document.getElementById(fieldId);
  if (field) {
      field.addEventListener('input', function() {
          const value = this.value;
          if (value && !isValidPhone(value)) {
              this.value = value.replace(/[^0-9]/g, '');
              this.classList.add('error');
              setTimeout(() => { this.classList.remove('error'); }, 1000);
          } else {
              this.classList.remove('error');
              if (value) this.classList.add('success');
          }
      });
      field.addEventListener('keypress', function(e) {
          if (!/[0-9]/.test(e.key) && !['Backspace', 'Delete', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
              e.preventDefault();
          }
      });
  }
});

document.getElementById('motherName').addEventListener('input', function() {
  const motherPhone = document.getElementById('motherPhone');
  const label = motherPhone.parentElement.querySelector('label');
  if (this.value.trim()) {
      motherPhone.required = true;
      label.innerHTML = `${translations[currentLang].motherPhone} <span class="required">*</span>`;
  } else {
      motherPhone.required = false;
      label.innerHTML = translations[currentLang].motherPhone;
  }
});

// Form validation
function validateForm() {
  const kName = document.getElementById('kName').value.trim();
  const eName = document.getElementById('eName').value.trim();
  const gender = document.getElementById('gender').value;
  const dob = document.getElementById('dob').value;
  if (!kName || !eName || !gender || !dob || !isKhmerText(kName) || !isEnglishText(eName)) return false;

  if (!hasRegisteredBefore) {
      const fatherName = document.getElementById('fatherName').value.trim();
      const motherName = document.getElementById('motherName').value.trim();
      const motherPhone = document.getElementById('motherPhone').value.trim();
      const province = document.getElementById('parentProvince').value.trim();
      const district = document.getElementById('parentDistrict').value.trim();
      const commune = document.getElementById('parentCommune').value.trim();
      const village = document.getElementById('parentVillage').value.trim();
      const email = document.getElementById('email').value.trim();
      if (!fatherName && !motherName) return false;
      if (motherName && !motherPhone) return false;
      if (!province || !district || !commune || !village || !email || !validateEmail(email)) return false;
  }
  return true;
}

// Show/Hide messages
function showMessage(type) {
  hideMessages();
  const message = type === 'success' ? successMessage : errorMessage;
  message.style.display = 'block';
  setTimeout(hideMessages, 5000);
}
function hideMessages() {
  successMessage.style.display = 'none';
  errorMessage.style.display = 'none';
}

// Send data to Firebase
async function sendToApp() {
  // --- Final validation check before sending ---
  const linkStatus = isLinkValid();
  if (!linkStatus.valid) {
      disableForm(linkStatus.reason);
      return;
  }

  if (!validateForm()) {
      alert(translations[currentLang].fillRequired);
      return;
  }

  submitBtn.classList.add('loading');
  submitBtn.disabled = true;

  const studentData = {
      kName: document.getElementById("kName").value.trim(),
      eName: document.getElementById("eName").value.trim(),
      gender: document.getElementById("gender").value,
      dob: document.getElementById("dob").value,
      studentPhone: document.getElementById("studentPhone").value.trim(),
      previousSchool: document.getElementById("previousSchool").value.trim(),
      hasRegisteredBefore: hasRegisteredBefore,
      timestamp: new Date().toISOString()
  };

  if (!hasRegisteredBefore) {
      studentData.parentInfo = {
          fatherName: document.getElementById("fatherName").value.trim(),
          fatherPhone: document.getElementById("fatherPhone").value.trim(),
          fatherJob: document.getElementById("fatherJob").value.trim(),
          motherName: document.getElementById("motherName").value.trim(),
          motherPhone: document.getElementById("motherPhone").value.trim(),
          motherJob: document.getElementById("motherJob").value.trim(),
          address: {
              province: document.getElementById("parentProvince").value.trim(),
              district: document.getElementById("parentDistrict").value.trim(),
              commune: document.getElementById("parentCommune").value.trim(),
              village: document.getElementById("parentVillage").value.trim()
          },
          email: document.getElementById("email").value.trim()
      };
  }

  const key = new URLSearchParams(window.location.search).get('key');
  try {
      const response = await fetch(`https://temp-register-student-default-rtdb.asia-southeast1.firebasedatabase.app/forms/${key}.json`, {
          method: "PUT",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(studentData)
      });
      if (response.ok) {
          showMessage('success');
          resetForm();
      } else {
          throw new Error('Network response was not ok');
      }
  } catch (error) {
      console.error('Error:', error);
      showMessage('error');
  } finally {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
  }
}

// Reset form
function resetForm() {
  document.getElementById("studentCard").querySelector("form")?.reset();
  document.getElementById("parentCard").querySelector("form")?.reset();
  document.querySelectorAll('.form-control').forEach(input => input.classList.remove('error', 'success'));
  document.querySelectorAll('.error-message').forEach(error => error.style.display = 'none');
  choiceButtons.forEach(btn => btn.classList.remove('selected'));
  hasRegisteredBefore = null;
  studentCard.classList.add('hidden');
  parentCard.classList.add('hidden');
  submitSection.classList.add('hidden');
  initialQuestion.style.display = 'block';
}

// Submit button handler
submitBtn.addEventListener('click', sendToApp);

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  hideMessages();
  updateLanguage();

  // --- Validate the link as soon as the page loads ---
  const linkStatus = isLinkValid();
  if (!linkStatus.valid) {
      disableForm(linkStatus.reason);
  }
});

// Add interactive effects for form inputs
document.querySelectorAll('.form-control').forEach(input => {
  input.addEventListener('focus', function() {
      this.parentElement.style.transform = 'scale(1.01)';
  });
  input.addEventListener('blur', function() {
      this.parentElement.style.transform = 'scale(1)';
  });
});