import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { Paper, Stack } from "@mui/material";
import { formatDate } from "@fullcalendar/core";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./calendar.css";

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>
        {formatDate(event.start, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </b>
      <i>{event.title}</i>
    </li>
  );
}

const Calendar = () => {
  const [weekendsVisible, setweekendsVisible] = useState(true);
  const [currentEvents, setcurrentEvents] = useState([]);

  const handleWeekendsToggle = () => {
    setweekendsVisible(!weekendsVisible);
  };

  const handleDateSelect = (selectInfo) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      const newEvent = {
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      };
      
      // Save the new event to localStorage
      const updatedEvents = [...currentEvents, newEvent];
      setcurrentEvents(updatedEvents);
      localStorage.setItem('events', JSON.stringify(updatedEvents)); // store in localStorage

      calendarApi.addEvent(newEvent);
    }
  };

  const handleEventClick = (clickInfo) => {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();

      // Remove the event from localStorage
      const updatedEvents = currentEvents.filter(
        (event) => event.id !== clickInfo.event.id
      );
      setcurrentEvents(updatedEvents);
      localStorage.setItem('events', JSON.stringify(updatedEvents)); // update localStorage
    }
  };

  const handleEvents = (events) => {
    setcurrentEvents(events);
  };

  const createEventId = () => {
    return String(new Date().getTime()); // simple event ID based on timestamp
  };

  // Load events from localStorage when the component mounts
  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem('events'));
    if (savedEvents) {
      setcurrentEvents(savedEvents);
    }
  }, []);

  return (
    <Stack direction={"row"}>
      <Paper className="demo-app-sidebar">
        <h2 style={{ textAlign: "center" }}>All Events ({currentEvents.length})</h2>
        <ul>{currentEvents.map(renderSidebarEvent)}</ul>
      </Paper>

      <div className="demo-app-main">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          initialEvents={currentEvents}  // Display saved events
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
        />
      </div>
    </Stack>
  );
};

export default Calendar;
