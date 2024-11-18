import React from 'react';

const Socials = ({ socialLinks= [], updateSocialLinks }) => {
  const [selectedSocial, setSelectedSocial] = React.useState('');
  const [link, setLink] = React.useState('');

  const handleSocialChange = (e) => {
    setSelectedSocial(e.target.value);
    setLink('');  // Reset link field when changing social
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleAddLink = (e) => {
    e.preventDefault();
    if (selectedSocial && link) {
      updateSocialLinks([...socialLinks, { platform: selectedSocial, url: link }]);
      setSelectedSocial('');
      setLink('');
    }
  };

  const handleDeleteLink = (index) => {
    const updatedLinks = socialLinks.filter((_, i) => i !== index);
    updateSocialLinks(updatedLinks);
  };

  return (
    <form>
      <div>
        <label htmlFor="social">Choose Social Media:</label>
        <select
          id="social"
          value={selectedSocial}
          onChange={handleSocialChange}
        >
          <option value="">-- Select Platform --</option>
          <option value="Facebook">Facebook</option>
          <option value="Twitter">Twitter</option>
          <option value="Instagram">Instagram</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="GitHub">GitHub</option>
        </select>
      </div>
        <br></br>
      <div>
        <label htmlFor="link">Link:</label>
        <input
          type="url"
          id="link"
          value={link}
          onChange={handleLinkChange}
          placeholder="Enter the URL"
        />
      </div>
      <br></br>
      <button type="button" onClick={handleAddLink} style={{width:'140px',padding:'5px'}}>
        Add Social Link
      </button>

      <div>
        <h3>Added Social Links:</h3>
        <ul>
          {socialLinks.map((social, index) => (
            <li key={index}>
              <strong>{social.platform}:</strong> {social.url} &nbsp;&nbsp;&nbsp;&nbsp;
              <button type="button" onClick={() => handleDeleteLink(index)} style={{width:'80px',padding:'5px'}}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
};

export default Socials;
