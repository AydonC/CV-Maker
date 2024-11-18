// Education.jsx
import React from 'react';

function Education({ educationEntries = [], updateEducationEntries }) {
  const handleEducationChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const newEntries = [...educationEntries];

    if (type === 'checkbox') {
      newEntries[index][name] = checked;
      if (checked) {
        newEntries[index].endDate = ''; // Clear end date if currently studying
      }
    } else {
      newEntries[index][name] = value;
    }

    // Ensure that state update happens here:
    updateEducationEntries(newEntries);
  };

  const addEducationForm = () => {
    updateEducationEntries([
      ...educationEntries,
      { institution: '', degree: '', field: '', startDate: '', endDate: '', description: '', currentlyStudying: false },
    ]);
  };

  const removeEducationForm = (index) => {
    const newEntries = educationEntries.filter((_, i) => i !== index);
    updateEducationEntries(newEntries);
  };

  return (
    <form>
      <h2>Education Information</h2>
      {educationEntries.map((entry, index) => (
        <div
          className="education-form"
          key={index}
          style={{
            border: '1px solid #ccc',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '5px',
          }}
        >
          <label>Institution Name:</label>
          <input
            type="text"
            name="institution"
            placeholder="Enter institution name"
            value={entry.institution}
            onChange={(e) => handleEducationChange(index, e)}
            required
          />
          
          <label>Qualification:</label>
          <input
            type="text"
            name="degree"
            placeholder="Enter Qualification (e.g., BSc, Diploma)"
            value={entry.degree}
            onChange={(e) => handleEducationChange(index, e)}
            required
          />
          <br />

          <label>Field of Study:</label>
          <input
            type="text"
            name="field"
            placeholder="Enter field of study"
            value={entry.field}
            onChange={(e) => handleEducationChange(index, e)}
            required
          />

          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={entry.startDate}
            onChange={(e) => handleEducationChange(index, e)}
            required
          />
          <br />

          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={entry.endDate}
            onChange={(e) => handleEducationChange(index, e)}
            disabled={entry.currentlyStudying}
            required={!entry.currentlyStudying}
          />
          <label>
            <input
              type="checkbox"
              name="currentlyStudying"
              checked={entry.currentlyStudying}
              onChange={(e) => handleEducationChange(index, e)}
            />
            Currently Studying
          </label>
          <br />

            <br />
          <button type="button" onClick={() => removeEducationForm(index)}>Remove</button>
        </div>
      ))}

      <button type="button" onClick={addEducationForm}  style={{ width:'180px',padding:'10px'}}>Add Another Education</button>
    </form>
  );
}

export default Education;
