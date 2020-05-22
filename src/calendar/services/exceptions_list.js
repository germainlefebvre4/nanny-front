import axios from 'axios';

function setExceptions(absenceDate, absenceType) {
    const formData = new FormData();
    formData.append('day', absenceDate);
    formData.append('absence', absenceType);

    console.log("Add exception", absenceDate, absenceType)

    return axios
      .post('http://localhost:8080/api/calendar/exceptions',
        formData
      ).then().catch()
}

export default { namespace: true, setExceptions }