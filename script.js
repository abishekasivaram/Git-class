const events = [
    { title: "Football Tournament", date: "2026-02-10", category: "Sports", description: "Inter-college football match.", location: "Main Ground" },
    { title: "AI Workshop", date: "2026-02-15", category: "Workshops", description: "Hands-on AI learning session.", location: "Lab 3" },
    { title: "Guest Lecture on Cybersecurity", date: "2026-02-18", category: "Guest Lecture", description: "Industry expert talk.", location: "Auditorium" },
    { title: "Basketball Championship", date: "2026-02-22", category: "Sports", description: "State-level competition.", location: "Sports Complex" },
    { title: "Web Development Bootcamp", date: "2026-02-25", category: "Workshops", description: "Full-day coding event.", location: "Lab 1" },
    { title: "Entrepreneurship Talk", date: "2026-03-02", category: "Guest Lecture", description: "Startup founder shares journey.", location: "Conference Hall" }
];

let currentPage = 1;
const eventsPerPage = 5;

const eventsContainer = document.getElementById("eventsContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
const pageNumber = document.getElementById("pageNumber");

function displayEvents(filteredEvents) {
    eventsContainer.innerHTML = "";
    const start = (currentPage - 1) * eventsPerPage;
    const paginatedEvents = filteredEvents.slice(start, start + eventsPerPage);

    paginatedEvents.forEach(event => {
        const card = document.createElement("div");
        card.className = "event-card";
        card.innerHTML = `
            <h3>${event.title}</h3>
            <p><strong>Date:</strong> ${event.date}</p>
            <p>${event.description}</p>
            <button onclick="alert('Location: ${event.location}')">View Details</button>
        `;
        eventsContainer.appendChild(card);
    });

    pageNumber.textContent = currentPage;
}

function filterEvents() {
    let filtered = events;

    const searchValue = searchInput.value.toLowerCase();
    filtered = filtered.filter(e =>
        e.title.toLowerCase().includes(searchValue) ||
        e.date.includes(searchValue)
    );

    const categoryValue = categoryFilter.value;
    if (categoryValue !== "All") {
        filtered = filtered.filter(e => e.category === categoryValue);
    }

    if (startDate.value) {
        filtered = filtered.filter(e => e.date >= startDate.value);
    }
    if (endDate.value) {
        filtered = filtered.filter(e => e.date <= endDate.value);
    }

    displayEvents(filtered);
}

searchInput.addEventListener("input", () => { currentPage = 1; filterEvents(); });
categoryFilter.addEventListener("change", () => { currentPage = 1; filterEvents(); });
startDate.addEventListener("change", () => { currentPage = 1; filterEvents(); });
endDate.addEventListener("change", () => { currentPage = 1; filterEvents(); });

document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        filterEvents();
    }
});

document.getElementById("nextPage").addEventListener("click", () => {
    currentPage++;
    filterEvents();
});

displayEvents(events);
