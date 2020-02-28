import axios from 'axios';

function getExceptions(year, month) {
    console.log(year, month)
    return axios
      .get('http://localhost:8080/calendar/exceptions/2019/1'
      ).then((data) => {
        if(data.status == 200) {
          console.log("inside")
          return data.status
        } else {
            console.log("An error occured");
        }
      }).catch()
}

export default { namespace: true, getExceptions }