import React from 'react'

const HandlePhoneLink = ({phoneNumber}: {phoneNumber: number}) => {
  
    const handlePhoneCall = () => {
        window.location.href = `tel:${phoneNumber}`;
    }
    return (
    <button onClick={handlePhoneCall}>
        {phoneNumber}
    </button>
  )
}

export default HandlePhoneLink