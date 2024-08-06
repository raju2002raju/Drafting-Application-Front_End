
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormField from './FormField';

const DraftForm = () => {
  const [fields, setFields] = useState([
    { label: 'Court' },
    { label: 'Title' },
    { label: 'Facts', addParagraph: true },
    { label: 'Court Fees', addParagraph: true },
  ]);

  const formFieldRefs = useRef([]);
  const navigate = useNavigate();

  const addField = (index) => {
    const newFields = [...fields];
    newFields.splice(index + 1, 0, { label: 'New Field', addParagraph: true });
    setFields(newFields);
  };

  const handleNext = () => {
    const transcripts = formFieldRefs.current.map(ref => ref?.getTranscripts());
    navigate('/output', { state: { data: transcripts } });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
      <div className="draft-form">
        {fields.map((field, index) => (
          <FormField
            key={index}
            ref={el => (formFieldRefs.current[index] = el)}
            label={field.label}
            onAdd={field.addParagraph ? () => addField(index) : null}
          />
        ))}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button className='submit_btn' onClick={handleNext}>NEXT</button>
        </div>
      </div>
    </div>
  );
};

export default DraftForm;
