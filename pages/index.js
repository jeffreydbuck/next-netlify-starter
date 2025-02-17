document.getElementById('calendarForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const teamName = document.getElementById('teamName').value;
    const monthYear = document.getElementById('monthYear').value;
    
    if (!teamName || !monthYear) return;

    const [year, month] = monthYear.split('-');
    generateCalendar(year, month);
});

function generateCalendar(year, month) {
    const calendarContainer = document.getElementById('calendarContainer');
    calendarContainer.innerHTML = ''; // Clear any existing calendar

    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const totalDays = lastDay.getDate();

    for (let i = 1; i <= totalDays; i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.innerHTML = `<span>${i}</span><br><span>$${i}</span>`;
        dayElement.addEventListener('click', () => markCompleted(dayElement));
        calendarContainer.appendChild(dayElement);
    }

    // Generate unique URL for this calendar
    const uniqueUrl = `${window.location.href}?team=${encodeURIComponent(teamName)}&month=${month}&year=${year}`;
    console.log(`Your unique URL: ${uniqueUrl}`);
}

function markCompleted(dayElement) {
    dayElement.classList.toggle('completed');
}

document.getElementById('downloadBtn').addEventListener('click', function() {
    html2canvas(document.getElementById('calendarContainer')).then(function(canvas) {
        const dataUrl = canvas.toDataURL();
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'fundraising-calendar.png';
        link.click();
    });
});
