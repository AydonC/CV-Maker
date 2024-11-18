import React from 'react';

const Skills = ({ skills = [], updateSkills }) => {
  const [input, setInput] = React.useState('');

  const handleAddItem = () => {
    if (input.trim()) {
      updateSkills([...skills, input]); // Update parent state with new skill
      setInput('');
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleDelete = (index) => {
    const newList = skills.filter((_, i) => i !== index);
    updateSkills(newList); // Update parent state after deletion
  };

  return (
    <div style={{ border: 'solid' }}>
      <h2>Skills</h2>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Add a new skill"
      />
      &nbsp;&nbsp;&nbsp;&nbsp;
      <button type="button" onClick={handleAddItem} style={{width:'80px',padding:'5px'}}>Add</button>
      <div>
        <ul>
          {skills.map((item, index) => (
            <li key={index}>
              {item}
              <button onClick={() => handleDelete(index)}  style={{ marginLeft: '10px' ,width:'80px',padding:'5px'}}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Skills;
