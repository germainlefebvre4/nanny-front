import axios from 'axios';

function getCalendarExceptions() {
    return axios
      .get('http://localhost:8080/calendar/exceptions')
}

export default { namespace: true, getCalendarExceptions }