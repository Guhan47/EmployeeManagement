import React from 'react'

function Sql() {
  return (
    <>
    <div>
        <h1>INSERTING DATA INTO MY MYSQL DATABASE TABLE</h1>

    </div>


    <div>
    <form action="http://localhost:3000/insert" method="POST">
    <label>NAME</label>
    <input type="text" name="name"/>

    <hr />

    <label>CITY</label>
    <input type="text" name="city"/>

    <hr />

    <label>AGE</label>
    <input type="number" name="age"/>

    <button type="submit">SUBMIT</button>
</form>

    </div>
    </>
  )
}

export default Sql