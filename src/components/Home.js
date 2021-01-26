import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

import '../App.css';

function Home() {
  const [name, setName] = useState('');
  const [manila, setManila] = useState('');
  const [melbourne, setMelbourne] = useState('');
  const [welcome, setWelcome] = useState(false);

  Moment.globalFormat = 'hh:mm:ss a';
  Moment.globalTimezone = 'UTC';

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    setWelcome(true);
  }

  useEffect(() => {
    async function fetchTimes() {
      await fetch("http://api.timezonedb.com/v2.1/list-time-zone?key=H3S57JBR3HZ1&format=json")
      .then(res => res.json())
      .then(data => {
        let mel = data.zones.filter(zone => zone.zoneName === 'Australia/Melbourne');
        let mnl = data.zones.filter(zone => zone.zoneName === 'Asia/Manila');
        setManila(mnl[0].timestamp);
        setMelbourne(mel[0].timestamp);
      });
    }

    fetchTimes()
  }, []);

  return (
    <React.Fragment>
      <div className="form">
        <label>Hello. What is your name?</label>
        <input type="text" name="name" onChange={e => handleChange(e)} value={name} /><br />
        { !welcome ? <button onClick={handleSubmit}>Submit</button> : '' }
      </div>
      { welcome ?
        <div className="welcome">
          <p>Welcome { name }!</p>
          <p>The time in Manila now is&nbsp;
            <Moment unix>{manila}</Moment>
          </p>
          <p>The time in Melbourne now is&nbsp;
            <Moment unix>{melbourne}</Moment>
          </p>
        </div>
      :
        <p className="align-center">Please type your name in the input field above</p>
      }
    </React.Fragment>
  )
}

export default Home;
