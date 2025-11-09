document.addEventListener("DOMContentLoaded", () => {
  displayRoommates();

  const rmForm = document.getElementById("roommateForm");
  if (rmForm) {
    rmForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("rmName").value;
      const year = document.getElementById("rmYear").value;
      const branch = document.getElementById("rmBranch").value;
      const contact = document.getElementById("rmContact").value;
      const preferences = Array.from(document.querySelectorAll(".rmPref:checked"))
        .map(p => p.value)
        .join(", ");

      const newRoommate = { name, year, branch, preferences, contact, time: new Date().toLocaleString() };

      await fetch("/api/roommate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRoommate),
      });

      rmForm.reset();
      displayRoommates();
    });
}
  async function displayRoommates() {
    const listDiv = document.getElementById("roommateList");
    if (!listDiv) return;

    const res = await fetch("/api/roommate");
    const roommates = await res.json();

    listDiv.innerHTML = roommates.length
      ? roommates.map(r => `
          <div class="roommateCard">
            <strong>Name:</strong> ${r.name}<br>
            <strong>Year:</strong> ${r.year}<br>
            <strong>Branch:</strong> ${r.branch}<br>
            <strong>Preferences:</strong> ${r.preferences}<br>
            <strong>Contact:</strong> ${r.contact}<br>
            <small><em>${r.time}</em></small>
            <hr>
          </div>
        `).join('')
      : "<p>No roommate posts yet.</p>";
  }
});