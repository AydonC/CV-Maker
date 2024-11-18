import React from 'react';

const References = ({ references = [], updateReferences }) => {
  const [input, setInput] = React.useState('');

  const handleAddItem = () => {
    if (input.trim()) {
      updateReferences([...references, input]); // Update parent state with new reference
      setInput('');
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleDelete = (index) => {
    const newList = references.filter((_, i) => i !== index);
    updateReferences(newList); // Update parent state after deletion
  };

  return (
    <div style={{ border: 'solid' }}>
      <h2>References</h2>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Add a new reference"
      />
      &nbsp;&nbsp;&nbsp;&nbsp;
      <button type="button" onClick={handleAddItem} style={{width:'80px',padding:'5px'}}>Add</button>
      <div>
        <ul>
          {references.map((item, index) => (
            <li key={index}>
              {item}
              <button onClick={() => handleDelete(index)} style={{ marginLeft: '10px' ,width:'80px',padding:'5px'}}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default References;
