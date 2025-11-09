 document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("lostFoundForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const type = document.getElementById("itemType").value;
      const name = document.getElementById("itemName").value;
      const description = document.getElementById("description").value;
      const contact = document.getElementById("contactInfo").value;

      const newItem = { type, name, description, contact, time: new Date().toLocaleString() };

      await fetch("http://localhost:3000/api/lostfound", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });

      form.reset();
      displayItems();
    });
  }

  async function displayItems() {
    const listDiv = document.getElementById("itemList");
    if (!listDiv) return;

    const res = await fetch("http://localhost:3000/api/lostfound");
    const items = await res.json();

    listDiv.innerHTML = items.length
      ? items.map(item => `
          <div class="itemCard">
            <strong>${item.type}:</strong> ${item.name}<br>
            <strong>Description:</strong> ${item.description}<br>
            <strong>Contact:</strong> ${item.contact}<br>
            <small><em>${item.time}</em></small>
            <hr>
          </div>
        `).join('')
      : "<p>No items reported yet.</p>";
  }

  displayItems();
});

