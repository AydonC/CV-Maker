import React from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const PhoneNumber = ({ phoneNumber, updatePhoneNumber }) => {
  const handlePhoneChange = (value) => {
    updatePhoneNumber(value); // Update the parent state
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <PhoneInput
        international
        value={phoneNumber}
        onChange={handlePhoneChange}
        placeholder="Enter phone number"
        style={{ width: '300px' }}
      />
    </div>
  );
};

export default PhoneNumber;
