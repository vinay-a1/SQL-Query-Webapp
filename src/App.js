import { tab } from '@testing-library/user-event/dist/tab';
import React, { useState } from 'react';
import './App.css';

const table = [
  {
    id: 1,
    name: 'test test',
    phone: '899999999',
    age: 30
  },
  {
    id: 2,
    name: 'test test',
    phone: '899999999',
    age: 30
  },
  {
    id: 3,
    name: 'test test',
    phone: '899999999',
    age: 30
  },
]

function App() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [data, setData] = useState([]);
  const handleQuery = () => {
    const queryList = query.split(" ");
    switch (queryList[0]) {
      case 'add':
        if (queryList.length !== 5) {
          setError(true);
          setErrorMsg("Invalid add syntax");
          break;
        } else {
          const entry = {
            id: queryList[1].split(":")[1],
            name: queryList[2].split(":")[1],
            phone: queryList[3].split(":")[1],
            age: queryList[4].split(":")[1],
          }
          table.push(entry);
          setError(false);
          setSuccessMsg("Insertion successful");
          setQuery("");
          setIsFetched(false);
          break;

        }
      case "del":
        if (queryList.length !== 2) {

          setError(true);
          setErrorMsg("Invalid get syntax");

        } else {
          if (queryList[1] === "all") {

            table.splice(0, table.length);
            setData([]);
            setSuccessMsg("All data deletion successful");
            setQuery("");
          } else {
            if ((Number(queryList[1]) !== NaN) && (parseInt(queryList[1]) <= table.length)) {
              setError(false);
              setSuccessMsg("data deletion successful");
              setData(table.slice(parseInt(queryList[1]), table.length));

            } else {
              setIsFetched(false);
              setError(true);
              setErrorMsg("Invalid del syntax : must be del 'all/finite number'");
            }
          }
        }
        break;

      case "get":

        if (queryList.length !== 2) {

          setError(true);
          setErrorMsg("Invalid get syntax");

        } else {
          if (queryList[1] === "all") {
            setIsFetched(true);
            setData(table);
            setSuccessMsg("Data fetching successful");
            setQuery("");
          } else {
            if ((Number(queryList[1]) !== NaN) && (parseInt(queryList[1]) <= table.length)) {
              setIsFetched(true);
              setData(table.slice(0, parseInt(queryList[1])));
            } else {
              setIsFetched(false);
              setError(true);
              setErrorMsg("Invalid get syntax : must be get 'all/finite number'");
            }
          }
        }
        break;
      default:
        break;
    }


  }
  return (
    <div className="App">
      <h2>Task - Atlan Frontend Engineer</h2>
      <div className='container' >
        <div className="input_field" >
          <div className="input_query">
            <input id="input_txt" type="text" value={query} placeholder="Write your queries here.." onChange={(e) => setQuery(e.target.value)} />
            <button id="btn" onClick={handleQuery}>Run Query</button> </div>
          <div className="output">
            {
              error && <div style={{color: 'red', marginBottom:'5px', fontWeight:'bold'}}>{errorMsg}</div>
            }
            {!error && <div style={{color:'green', marginBottom:'5px', fontWeight:'bold'}}>{successMsg}</div>}
            {!error && isFetched && <div>{
              data.map((d, index) => {
                return (
                  <div key={index}>
                    {JSON.stringify(d)}
                  </div>
                )
              }
              )}
            </div>}
          </div>
        </div>
        <div className="rules" >
          <h2>Query Syntaxes</h2>
          <dl>
            <h5 >GET Query</h5>
            <ul><li><dt >get all</dt>
              <dd>-to display all the entries</dd></li><li><dt >get number</dt>
              <dd>-For eexample: type "get 5" to get 5 entries</dd></li></ul>
          </dl>
          <dl>
            <h5 >DELETE Query</h5>
            <ul><li><dt >del all</dt>
              <dd>-to delete all the entries</dd></li>
            <li><dt >del number</dt>
              <dd>-For eexample: type "del 5" to delete 5 entries</dd></li></ul>
          </dl>
          <dl>
            <h5 >ADD Query</h5>
            <ul><li><dt >add id:_ name:_ phone:_ age:_</dt>
              <dd>-"_"should be replaced by its value</dd></li></ul>
            <ul><li><dt >For example: add id:4 name:Vinay phone:99999 age:21</dt></li>
              <li>Run query: write your query in the input box and then click on "Run Query" to get result.</li>
            </ul>
          </dl>
          <div className="Note"><mark>Note: There is 3 default inputs are given for the format so when you will write the query "get all", it will show the default 3 data too.</mark></div>
        </div>
      </div>
      <footer>
      ©copyright 2022, Made with ❤️ by <a href="https://www.vinaygiri.com.np/" target="_blank">Vinay Giri</a>
      </footer>
    </div>
  );
}

export default App;
