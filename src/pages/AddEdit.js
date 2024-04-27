import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './AddEdit.css'
import { toast } from 'react-toastify'
import fireDb from '../firebase'



const initialState = {
    name: "",
    rollno: "",
    classname: "",
    address: ""

}
const AddEdits = () => {
    const [state, setState] = useState(initialState);
    const [data, setData] = useState({});

    const { name, rollno, classname, address } = state;

    const navigate = useNavigate();

    const { id } = useParams();

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
    }, [id]);


    useEffect(() => {
        if(id){
            setState({...data[id]})
        } else{
            setState({...initialState});
        }
        return()=>{
            setState({...initialState});

        };

    }, [id, data]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !rollno || !classname || !address) {
            toast.error("Please provide value in each input field.")
        } else {
            if(!id){
            fireDb.child("Students").push(state, (err) => {
                if (err) {
                    toast.error(err);
                } else {
                    toast.success("Student added Successfully!")
                }
            });
        } else{
            fireDb.child(`Students/${id}`).set(state, (err) => {
                if (err) {
                    toast.error(err);
                } else {
                    toast.success("Student Updated Successfully!")
                }
            });

        }
            setTimeout(() => navigate("/"), 500);
        }
    };

    return (
        <div style={{ marginTop: "100px" }}>
            <form
                style={{
                    margin: "auto",
                    padding: "15px",
                    maxWidth: "400px",
                    alignContent: "center"
                }} onSubmit={handleSubmit}
            >


                <label htmlFor='name'> Name </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder='Your Name...'
                    value={name || ""}
                    onChange={handleInputChange}
                />
                <label htmlFor='rollno'> Roll number </label>
                <input
                    type="text"
                    name="rollno"
                    id="rollno"
                    placeholder='Your Roll number...'
                    value={rollno || ""}
                    onChange={handleInputChange}
                />
                <label htmlFor='classname'> Class </label>
                <input
                    type="text"
                    name="classname"
                    id="classname"
                    placeholder='Your Class Name...'
                    value={classname  || ""}
                    onChange={handleInputChange}
                />
                <label htmlFor='address'> Address </label>
                <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder='Your Address...'
                    value={address  || ""}
                    onChange={handleInputChange}
                />
                <input type="submit" value={id? "Update" :"Save"} />
            </form>
        </div>)
}
export default AddEdits;                                    