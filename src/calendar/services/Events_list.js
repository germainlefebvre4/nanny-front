import axios from 'axios';

function getEvents(dateYear, dateMonth) {
    return axios.get('http://localhost:8080/api/daysoff/search?year='+dateYear+'&month='+dateMonth
    ).then((response) => {
      if(response.status == 200) {
        let events = App.$.CalendarPicker.events;
        const items = response.data

        for(const item in items) {
          events.push({
            name: `${items[item]["kind"]}`,
            start: `${items[item]["day"]}`,
            color: App.$.CalendarPicker.event_colors[`${items[item]["absenceid"]}`],
          })
          // events = [...events, newEvent];
        }

        App.$.CalendarPicker.start = start
        App.$.CalendarPicker.end = end
        App.$.CalendarPicker.events = events
      } else {
          console.log("An error occured");
      }
    }).catch()    

}

export default { namespace: true, getEvents }