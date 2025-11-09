document.addEventListener("DOMContentLoaded", () => {
  displayExchange();

  const exForm = document.getElementById("exchangeForm");
  if (exForm) {
    exForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("exName").value;
      const type = document.getElementById("exType").value;
      const item = document.getElementById("exItem").value;
      const description = document.getElementById("exDesc").value;
      const contact = document.getElementById("exContact").value;

      const newPost = { name, type, item, description, contact, time: new Date().toLocaleString() };

      await fetch("/api/exchange", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });

      exForm.reset();
        displayExchange();
    });
  }

  async function displayExchange() {
    const listDiv = document.getElementById("exchangeList");
    if (!listDiv) return;

    const res = await fetch("/api/exchange");
    const exchanges = await res.json();

    listDiv.innerHTML = exchanges.length
      ? exchanges.map(ex => `
          <div class="exchangeCard">
            <strong>${ex.type}:</strong> ${ex.item}<br>
            <strong>By:</strong> ${ex.name}<br>
            <strong>Description:</strong> ${ex.description || "No description"}<br>
            <strong>Contact:</strong> ${ex.contact}<br>
            <small><em>${ex.time}</em></small>
            <hr>
          </div>
        `).join('')
      : "<p>No exchange posts yet.</p>";
  }
});