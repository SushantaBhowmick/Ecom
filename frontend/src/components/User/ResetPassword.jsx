import React, { Fragment,useState,useEffect } from 'react'
import './ResetPassword.css'
import { useAlert} from 'react-alert'
import { useDispatch,useSelector} from 'react-redux';
import {clearErrors,resetPassword} from '../../actions/userAction'
import Loader from '../layout/Loader/Loader'
import {useNavigate } from 'react-router-dom'
import MetaData from '../layout/MetaData';
import LockOpenIcon from "@material-ui/icons/LockOpen"
import LockIcon from "@material-ui/icons/Lock"
import { useParams } from 'react-router-dom'


const ResetPassword = () => {
    
    const navigate = useNavigate();
    const match  =useParams();
    const dispatch = useDispatch();
    const alert = useAlert();
  
    const { error, success, loading } = useSelector(
      (state) => state.forgotPassword
    );
  
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const resetPasswordSubmit = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("password", password);
      myForm.set("confirmPassword", confirmPassword);
  
  
      dispatch(resetPassword(match.token,myForm));
    };
    useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        if (success) {
          alert.success("Password Updated Successfully");

            navigate("/login");
        }
        
      }, [dispatch,error,alert,navigate,success]);
      
  return (
    <Fragment>
    {loading ? (
      <Loader />
    ) : (
      <Fragment>
        <MetaData title="Change Password" />
        <div className="resetPasswordContainer">
          <div className="resetPasswordBox">
            <h2 className="heading">Reset Password</h2>

            <form
              className="resetPasswordForm"
              onSubmit={resetPasswordSubmit}
            >

              <div>
                <LockOpenIcon />
                <input
                  type="password"
                  placeholder="New Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div >
                <LockIcon />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <input
                type="submit"
                value="Update"
                className="resetPasswordBtn"
              />
            </form>
          </div>
        </div>
      </Fragment>
    )}
  </Fragment>
  )
}

export default ResetPassword