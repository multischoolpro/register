const urlParams = new URLSearchParams(window.location.search);
const key = urlParams.get('key'); // Get key from ?key=

function sendToApp() {
  const data = {
    kName: document.getElementById("kName").value,
    eName: document.getElementById("eName").value
  };

  if (!key) {
    alert("❌ Missing key in the URL.");
    return;
  }

  fetch(`https://temp-register-student-default-rtdb.asia-southeast1.firebasedatabase.app/forms/${key}.json`, {
    method: "PUT",
    body: JSON.stringify(data)
  })
  .then(() => {
    alert("✅ Sent to Windows App!");
    document.getElementById("kName").value = "";
    document.getElementById("eName").value = "";
  })
  .catch(() => alert("❌ Failed to send data. Please try again."));
}
