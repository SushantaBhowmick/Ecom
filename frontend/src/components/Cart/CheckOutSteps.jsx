import { Step, StepLabel, Stepper, Typography } from '@material-ui/core'
import "./CheckOutSteps.css"
import React, { Fragment } from 'react'
import LocalShippingIcon from "@material-ui/icons/LocalShipping"
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck"
import AccountBalanceIcon from "@material-ui/icons/AccountBalance"

const CheckOutSteps = ({ activeStep }) => {
    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            Icon: <LocalShippingIcon />
        },
        {
            label: <Typography>Shipping Details</Typography>,
            Icon: <LibraryAddCheckIcon />
        },
        {
            label: <Typography>Shipping Details</Typography>,
            Icon: <AccountBalanceIcon />
        },
    ];
    const stepStyles = {
        boxSizing: "border-box",
    }
    return (
        <Fragment>
            <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
                {steps.map((item, index) => (
                    <Step key={index} active={activeStep === index ? true : false}
                        completed={activeStep >= index ? true : false} >
                        <StepLabel
                            style={{ color: activeStep >= index ? "#1A8CD2" : "rgba(0,0,0,0.649)" }}
                            icon={item.Icon} > {item.label} </StepLabel>
                    </Step>
                ))}
            </Stepper>

        </Fragment>
    )
}

export default CheckOutSteps