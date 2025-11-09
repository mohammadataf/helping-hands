let contactData = [];

async function fetchContacts() {
  try {
    const response = await fetch('contact.json');
    contactData = await response.json();
  } catch (error) {
    console.log("Error loading contacts:", error);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await fetchContacts();

  const searchInput = document.getElementById("ContactSearch");
  const suggestionList = document.getElementById("Suggestions");
  const contactInfo = document.getElementById("ContactInfo");

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const input = searchInput.value.toLowerCase();
      suggestionList.innerHTML = "";

      if (input) {
        const filtered = contactData.filter(c =>
          c.name.toLowerCase().includes(input)
        );

        filtered.forEach(contact => {
          const li = document.createElement("li");
          li.textContent = `${contact.name} (${contact.designation})`;
          li.addEventListener("click", () => {
            searchInput.value = contact.name;
            suggestionList.innerHTML = "";
            contactInfo.innerHTML = `              <div>
                <strong>Name:</strong> ${contact.name}<br>
                <strong>Contact:</strong> ${contact.phone}<br>
                                <strong>Email:</strong> ${contact.email}
              </div>
            `;
          });
          suggestionList.appendChild(li);
        });
      }
    });
  }
});
