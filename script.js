const events = [
  { title: "Football Match", date: "2026-02-10", category: "Sports", desc: "Inter-college match", location: "Ground" },
  { title: "AI Workshop", date: "2026-02-15", category: "Workshops", desc: "Learn AI basics", location: "Lab 2" },
  { title: "Cybersecurity Talk", date: "2026-02-18", category: "Guest Lecture", desc: "Expert session", location: "Hall" },
  { title: "Basketball Event", date: "2026-02-22", category: "Sports", desc: "College championship", location: "Court" },
  { title: "Web Dev Bootcamp", date: "2026-02-25", category: "Workshops", desc: "Build websites", location: "Lab 1" },
  { title: "Startup Seminar", date: "2026-03-02", category: "Guest Lecture", desc: "Entrepreneur talk", location: "Auditorium" }
];

let currentPage = 1;
const perPage = 5;

function showEvents(list) {
    const eventList = document.getElementById("eventList");
    eventList.innerHTML = "";

    const start = (currentPage - 1) * perPage;
    const pageItems = list.slice(start, start + perPage);

    pageItems.forEach(e => {
        eventList.innerHTML += `
            <div class="card">
                <h3>${e.title}</h3>
                <p><b>Date:</b> ${e.date}</p>
                <p>${e.desc}</p>
                <button onclick="alert('Location: ${e.location}')">View Details</button>
            </div>
        `;
    });

    document.getElementById("pageNum").innerText = currentPage;
}

function filterEvents() {
    let filtered = events;

    const search = document.getElementById("search").value.toLowerCase();
    const category = document.getElementById("category").value;
    const startDate = document.getElementById("start").value;
    const endDate = document.getElementById("end").value;

    filtered = filtered.filter(e =>
        e.title.toLowerCase().includes(search) || e.date.includes(search)
    );

    if (category !== "All")
        filtered = filtered.filter(e => e.category === category);

    if (startDate)
        filtered = filtered.filter(e => e.date >= startDate);

    if (endDate)
        filtered = filtered.filter(e => e.date <= endDate);

    currentPage = 1;
    showEvents(filtered);
}

function nextPage() { currentPage++; filterEvents(); }
function prevPage() { if (currentPage > 1) currentPage--; filterEvents(); }

document.getElementById("search").addEventListener("input", filterEvents);
document.getElementById("category").addEventListener("change", filterEvents);
document.getElementById("start").addEventListener("change", filterEvents);
document.getElementById("end").addEventListener("change", filterEvents);

showEvents(events);
