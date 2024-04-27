import React, { useState, useEffect } from 'react'
import fireDb from '../firebase';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './View.css';

const View = () => {

  const [user, setUser] = useState({});

  const { id } = useParams();

  useEffect(() => {
    fireDb.child(`Students/${id}`).get().then((snapshot) => {
      if (snapshot.exists()) {
        setUser({ ...snapshot.val() });
      } else {
        setUser({});
      }

    })

  }, [id]);

  console.log("user", user);

  return (
    <div style={{ marginTop: "150px" }}>
      <div className="card">
        <div className="card-header">
          <p> Student Details</p>
        </div>
        <div className="container">
          <strong>ID:</strong>
          <span> {id}</span>
          <br />
          <br />
          <strong> Name: </strong>
          <span> {user.name}</span>
          <br />
          <br />
          <strong> Roll no: </strong>
          <span> {user.rollno}</span>
          <br />
          <br />
          <strong> Class: </strong>
          <span> {user.classname}</span>
          <br />
          <br />
          <strong>Address: </strong>
          <span> {user.address}</span>
          <br />
          <br />
          <Link to="/">
            <button className='btn btn-edit'> Go Back</button> </Link>
        </div>

      </div>
    </div>
  )
}

export default View;