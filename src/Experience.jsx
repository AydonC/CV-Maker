import { useState } from 'react';

function Experience({ experienceEntries, updateExperienceEntries }) {
  const handleExperienceChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const newEntries = [...experienceEntries];

    if (type === 'checkbox') {
      newEntries[index][name] = checked;
      if (checked) {
        newEntries[index].endDate = ''; 
      }
    } else {
      newEntries[index][name] = value;
    }

    updateExperienceEntries(newEntries); 
  };

  const addExperienceForm = () => {
    updateExperienceEntries([
      ...experienceEntries,
      { company: '', position: '', location: '', startDate: '', endDate: '', description: '', currentlyEmployed: false },
    ]);
  };

  const removeExperienceForm = (index) => {
    const newEntries = experienceEntries.filter((_, i) => i !== index);
    updateExperienceEntries(newEntries); 
  };

  return (
    <form>
      <h2>Experience Information</h2>
      {experienceEntries.map((entry, index) => (
        <div
          className="experience-form"
          key={index}
          style={{
            border: '1px solid #ccc',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '5px',
          }}
        >
          <label>Company Name:</label>
          <input
            type="text"
            name="company"
            placeholder="Enter company name"
            value={entry.company}
            onChange={(e) => handleExperienceChange(index, e)}
            required
          />

          <label>Location:</label>
          <input
            type="text"
            name="location"
            placeholder="Enter location"
            value={entry.location}
            onChange={(e) => handleExperienceChange(index, e)}
            required
          />
          <br />

          <label>Position:</label>
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={entry.position}
            onChange={(e) => handleExperienceChange(index, e)}
            required
          />

          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={entry.startDate}
            onChange={(e) => handleExperienceChange(index, e)}
            required
          />
          <br />

          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={entry.endDate}
            onChange={(e) => handleExperienceChange(index, e)}
            disabled={entry.currentlyEmployed}
            required={!entry.currentlyEmployed}
          />

          <label>
            <input
              type="checkbox"
              name="currentlyEmployed"
              checked={entry.currentlyEmployed}
              onChange={(e) => handleExperienceChange(index, e)}
            />
            Currently Employed
          </label>
          <br />
         
            <br />
          <button type="button" onClick={() => removeExperienceForm(index)}>
            Remove
          </button>
        </div>
      ))}

      <button type="button" onClick={addExperienceForm} style={{ width:'180px',padding:'10px'}}> 
        Add Another Experience
      </button>
    </form>
  );
}

export default Experience;
