import React, { useEffect, useState } from 'react'
import fireDb from '../firebase'
import { Link } from 'react-router-dom'
import './Home.css';
import { toast } from 'react-toastify';


const Home = () => {

  const [data, setData] = useState({});

  useEffect(() => {
    fireDb.child("Students").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });
    return () => {
      setData({})
    }
  }, []);

  const onDelete = (id)=>{
    if(window.confirm('Are you sure you wanted to delete this Student?')){
      fireDb.child(`Students/${id}`).remove((err)=>{
        if (err) {
          toast.error(err)
        } else{
          toast.success('Student Deleted Successfully!')
        }
      })
    }
  }

  return (
    <div style={{ marginTop: "100px" }}>
      <table className='styled-table'>
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}> No. </th>
            <th style={{ textAlign: "center" }}> Name </th>
            <th style={{ textAlign: "center" }}> Roll no </th>
            <th style={{ textAlign: "center" }}> Class </th>
            <th style={{ textAlign: "center" }}> Address </th>
            <th style={{ textAlign: "center" }}> Action </th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((id, index) => {
            return (
              <tr key={id}>
                <th scope='row'> {index + 1}</th>
                <td> {data[id].name} </td>
                <td> {data[id].rollno} </td>
                <td> {data[id].classname} </td>
                <td> {data[id].address} </td>
                <td>
                  <Link to={`/update/${id}`}>
                    <button className='btn btn-edit'> Edit </button>
                  </Link>
                  <button className='btn btn-delete' onClick={() => onDelete(id)}>
                    Delete </button>
                  <Link to={`/view/${id}`}>
                    <button className='btn btn-view'>  View </button>
                  </Link>
                </td>

              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
export default Home;
