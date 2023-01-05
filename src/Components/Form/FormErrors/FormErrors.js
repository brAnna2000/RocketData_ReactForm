import React from 'react';
import './FormErrors.css';

export const FormErrors = ({formErrors}) =>(
  <div className='formErrors'>
    {formErrors.length ? <p>{formErrors}</p> : <p></p>}
  </div>
);
