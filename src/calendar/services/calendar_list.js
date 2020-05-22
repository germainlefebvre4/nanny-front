import axios from 'axios';

function getExceptions(year, month) {
    return axios
      .get('http://localhost:8080/api/calendar/exceptions/'+year+'/'+month
      ).then((data) => {
        if(data.status == 200) {
          return data.status
        } else {
            console.log("An error occured");
        }
      }).catch()
}

export default { namespace: true, getExceptions }