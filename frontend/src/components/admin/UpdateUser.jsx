import React, { Fragment, useEffect, useState } from 'react';
import "./NewProduct.css";
import MailOutlineIcon from "@material-ui/icons/MailOutline"
import PersonIcon from "@material-ui/icons/Person"
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser"
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useNavigate, useParams } from 'react-router-dom';
import { UPDATE_USER_RESET } from '../../constants/userConstant';
import { updateUser,clearErrors, userDetails } from '../../actions/userAction';
import Loader from '../layout/Loader/Loader';

const UpdateUser = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { id } = useParams();

    const { loading, error, user } = useSelector((state) => state.userDetails);
    const { error: updateError, loading: updateLoading, isUpdated } = useSelector((state) => state.profile);


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
      
        if (user && user._id !== id) {
            dispatch(userDetails(id))
        } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors);
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors);
        }
        if (isUpdated) {
            alert.success("User Updated Successfully!")
            navigate('/admin/users');
            dispatch({ type: UPDATE_USER_RESET });

        }

    }, [dispatch, error, isUpdated, updateError,id, navigate, user, alert]);

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", role);

        dispatch(updateUser(id, myForm))
    }


    return (
        <Fragment>
            <MetaData title={"Update User"} />
            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    {loading? (<Loader />):(
                        <form
                        action=""
                        className="createProductForm"
                        encType='multipart/form-data'
                        onSubmit={updateUserSubmitHandler}
                    >
                        <h3>Update User</h3>
                        <div>
                            <PersonIcon />
                            <input type="text"
                                placeholder='Name'
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <MailOutlineIcon />
                            <input type="email"
                                placeholder='email'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <VerifiedUserIcon />
                            <select value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="">Choose Role</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                        </div>


                        <Button
                            id="createProductBtn"
                            type='submit'
                            disabled={updateLoading ? true : false || role==="" ? true:false}
                        >
                            Update
                        </Button>
                    </form>
                    )}
                </div>

            </div>
            

        </Fragment>
    )
}

export default UpdateUser