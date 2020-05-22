import axios from 'axios';

function getAbsenceType() {
    return axios
      .get('http://localhost:8080/api/absencetype'
      ).then((response) => {
        if(response.status == 200) {
          return response.data
        } else {
            console.log("An error occured");
        }
      }).catch()
}

export default { namespace: true, getAbsenceType }