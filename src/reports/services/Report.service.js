import axios from 'axios';

function getReports() {
    return axios
      .get('http://localhost:8080/reports/2019/11')
}

export default { namespace: true, getReports }