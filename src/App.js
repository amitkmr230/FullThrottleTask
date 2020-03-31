import React, { useState } from "react";
import "./styles.css";
import data from "./data.json";
import Modal from "./components/Modal";
import {
  Calendar as BigCalendar,
  momentLocalizer
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function App() {
  const [displayModal, setDisplayModal] = useState(false);
  const [userData, setUserData] = useState();
  const [showCalendar, setShowCalendar] = useState(false);
  const [userEvents, setUserEvents] = useState([]);

  const handleUserClick = user => {
    setDisplayModal(true);
    setUserData(user);
    const events = user.activity_periods.map(activity => {
      return {
        title: "Active",
        allDay: false,
        start: moment(activity.start_time, "MMM DD YYYY h:mm:ss a").toDate(),
        end: moment(activity.end_time, "MMM DD YYYY h:mm:ss a").toDate()
      };
    });
    setUserEvents(events);
  };

  const onModalClose = () => {
    setDisplayModal(false);
    setShowCalendar(false);
    setUserData({});
  };

  return (
    <div className="App container">
      <h2 className="mt-4 mb-4">User Activity Tracker</h2>
      <div className="row">
        {data.members.length > 0 &&
          data.members.map(user => (
            <div className="col-sm-6" key={user.id}>
              <div className="card">
                <div className="card-body">
                  <div
                    className="card-title"
                    onClick={_ => handleUserClick(user)}
                  >
                    {user.real_name}
                  </div>
                </div>
              </div>
            </div>
          ))}
        {displayModal && (
          <Modal
            title="User Information"
            showModal={displayModal}
            onClose={onModalClose}
          >
            <h3 className="text-left pl-3">{userData.real_name}</h3>
            <p className="text-left pl-3 ">{userData.id}</p>
            <p className="text-left pl-3">Timezone: {userData.tz}</p>
            <hr />
            <h5 className="text-left pl-3">Activity Periods</h5>
            <div className="text-left pl-3 mb-3">
              <button
                onClick={_ => setShowCalendar(!showCalendar)}
                className="btn btn-primary"
              >
                {!showCalendar ? "Open Calendar" : "Close Calendar"}
              </button>
            </div>
            {showCalendar && (
              <div
                className="mb-4"
                style={{ height: 500, overflowY: "scroll" }}
              >
                <BigCalendar
                  localizer={localizer}
                  events={userEvents}
                  view="week"
                  step={60}
                  views={["week"]}
                  defaultView="week"
                />
              </div>
            )}
          </Modal>
        )}
      </div>
    </div>
  );
}
