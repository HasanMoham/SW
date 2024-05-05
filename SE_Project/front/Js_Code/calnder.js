document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('.month-year');
  const datesContainer = document.querySelector('.dates');
  const prevMonthBtn = document.querySelector('.prev-month');
  const nextMonthBtn = document.querySelector('.next-month');
  const selectedDateField = document.getElementById('selectedDateField'); // Changed ID

  let currentDate = new Date();

  function getCalendarDates(date) {
      const today = new Date();
      const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      const startDayOfWeek = firstDayOfMonth.getDay();
      const totalSlots = 6 * 7;

      const calendarDates = [];

      const daysInPrevMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
      for (let i = startDayOfWeek - 1; i >= 0; i--) {
          calendarDates.push({
              date: daysInPrevMonth - i,
              inCurrentMonth: false,
              isToday: false
          });
      }

      for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
          const isToday = date.getFullYear() === today.getFullYear() &&
              date.getMonth() === today.getMonth() &&
              i === today.getDate();

          calendarDates.push({
              date: i,
              inCurrentMonth: true,
              isToday: isToday
          });
      }

      const currentSlots = startDayOfWeek + lastDayOfMonth.getDate();
      const remainingSlots = totalSlots - currentSlots;
      for (let i = 1; i <= remainingSlots; i++) {
          calendarDates.push({
              date: i,
              inCurrentMonth: false,
              isToday: false
          });
      }

      return calendarDates;
  }

  function renderCalendar(date) {
      const monthNames = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
      ];

      header.textContent = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;

      datesContainer.innerHTML = '';

      const calendarDates = getCalendarDates(date);

      calendarDates.forEach(dateItem => {
          const dateElement = document.createElement('div');
          dateElement.classList.add('date');

          const topSection = document.createElement('div');
          topSection.classList.add('date-top');
          topSection.textContent = dateItem.date;
          dateElement.appendChild(topSection);

          const bottomSection = document.createElement('div');
          bottomSection.classList.add('date-bottom');

          if (dateItem.inCurrentMonth) {
              const link = document.createElement('a');
              link.textContent = 'Book';
              link.href = 'visitform.html';
              link.target = '_blank';
              link.addEventListener('click', function() {
                  const currentDate = new Date();
                  const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), dateItem.date);
                  const formattedDate = selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
                  selectedDateField.value = formattedDate;
              });
              bottomSection.appendChild(link);
          }

          dateElement.appendChild(bottomSection);

          if (!dateItem.inCurrentMonth) {
              dateElement.classList.add('prev-next-month');
          }
          if (dateItem.isToday) {
              dateElement.classList.add('current-day');
          }

          datesContainer.appendChild(dateElement);
      });
  }

  renderCalendar(currentDate);

  prevMonthBtn.addEventListener('click', function() {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar(currentDate);
  });

  nextMonthBtn.addEventListener('click', function() {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar(currentDate);
  });
});
