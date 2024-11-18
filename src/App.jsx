import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import Experience from './Experience';
import Education from './Education';
import PhoneNumber from './PhoneNumber';
import References from './References';
import Skills from './Skills';
import Socials from './Socials';
import Address from './Address';
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    experience: [],
    education: [],
    skills: [],
    references: [],
    socials: [],
  });

  const [profileImage, setProfileImage] = useState(null);

  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); 
      };
      reader.readAsDataURL(file); 
    }
  };
  

  
  const updateExperienceEntries = (newExperience) => {
    setFormData((prevState) => ({
      ...prevState,
      experience: newExperience,
    }));
  };

  const updateEducationEntries = (newEducationEntries) => {
    setFormData((prevState) => ({
      ...prevState,
      education: newEducationEntries,
    }));
  };

  const updateSkills = (newSkills) => {
    setFormData((prevState) => ({
      ...prevState,
      skills: newSkills,
    }));
  };

  const updateReferences = (newReferences) => {
    setFormData((prevState) => ({
      ...prevState,
      references: newReferences,
    }));
  };

  const updateSocialLinks = (newSocials) => {
    setFormData((prevState) => ({
      ...prevState,
      socials: newSocials,
    }));
  };

  const updateAddress = (address) => {
    setFormData((prevState) => ({
      ...prevState,
      address: address.display_name,
    }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const margin = 10;  
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const marginBottom = 20; 
    let yPosition = 20;
  
    const drawBorder = () => {
      doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin, 'S');
    };
  
    
    drawBorder();
  
    
    doc.setFontSize(16);
    doc.text('Curriculum Vitae', 20, yPosition);
    yPosition += 15; 
  
    if (profileImage) {
      const imageWidth = 40; 
      const imageHeight = 40; 
      const imageX = (pageWidth - imageWidth) / 2;
  
      doc.addImage(profileImage, 'JPEG', imageX, yPosition, imageWidth, imageHeight);
      yPosition += imageHeight + 10; 
    }
  
  
    doc.setFontSize(12);
    doc.text(`Name: ${formData.name}`, 20, yPosition);
    yPosition += 10;
    doc.text(`Email: ${formData.email}`, 20, yPosition);
    yPosition += 10;
    doc.text(`Phone: ${formData.phone}`, 20, yPosition);
    yPosition += 10;
  
   
    doc.text('Address:', 20, yPosition);
    doc.setFontSize(8);
    doc.text(formData.address || 'N/A', 38, yPosition);
    yPosition += 15;
  
   
    if (formData.experience.length > 0) {
      doc.setFontSize(14);
      doc.text('Experience:', 20, yPosition);
      yPosition += 10;
      doc.setFontSize(12);
      formData.experience.forEach((entry) => {
        if (yPosition + 10 > pageHeight - marginBottom) {
          doc.addPage();
          drawBorder();  
          yPosition = 20;
        }
        doc.text(`${entry.position} at ${entry.company}`, 20, yPosition);
        yPosition += 8;
        doc.text(`Location: ${entry.location || 'N/A'}`, 20, yPosition);
        doc.text(`(${entry.startDate} - ${entry.endDate || 'Present'})`, 110, yPosition); 
        yPosition += 10; 
      });
    }
  
    
    if (formData.education.length > 0) {
      doc.setFontSize(14);
      doc.text('Education:', 20, yPosition);
      yPosition += 10;
      doc.setFontSize(12);
      formData.education.forEach((entry) => {
        if (yPosition + 10 > pageHeight - marginBottom) {
          doc.addPage();
          drawBorder();  
          yPosition = 20;
        }
        doc.text(`${entry.degree} from ${entry.institution} in ${entry.field}`, 20, yPosition);
        doc.text(`(${entry.startDate} - ${entry.endDate || 'Present'})`, 130, yPosition); 
        yPosition += 10; 
      });
    }
  
   
    if (formData.skills.length > 0) {
      doc.setFontSize(14);
      doc.text('Skills:', 20, yPosition);
      yPosition += 10;
      doc.setFontSize(12);
      formData.skills.forEach((skill) => {
        if (yPosition + 8 > pageHeight - marginBottom) {
          doc.addPage();
          drawBorder();  
          yPosition = 20;
        }
        doc.text(skill, 20, yPosition);
        yPosition += 8;
      });
      yPosition += 5;
    }
  
   
    if (formData.references.length > 0) {
      doc.setFontSize(14);
      doc.text('References:', 20, yPosition);
      yPosition += 10;
      doc.setFontSize(12);
      formData.references.forEach((ref) => {
        if (yPosition + 8 > pageHeight - marginBottom) {
          doc.addPage();
          drawBorder();  
          yPosition = 20;
        }
        doc.text(ref, 20, yPosition);
        yPosition += 8;
      });
      yPosition += 5;
    }
  
  
    if (formData.socials.length > 0) {
      doc.setFontSize(14);
      doc.text('Socials:', 20, yPosition);
      yPosition += 10;
      doc.setFontSize(12);
      formData.socials.forEach((social) => {
        if (yPosition + 8 > pageHeight - marginBottom) {
          doc.addPage();
          drawBorder();  
          yPosition = 20;
        }
        doc.text(`${social.platform}: ${social.url}`, 20, yPosition);
        yPosition += 8;
      });
    }
  
    doc.save(`${formData.name} cv.pdf`);
  };
  
  
  
  return (
    <div className="container">
      <form>
        <h1>CREATE YOUR CV</h1>
        <hr style={{ width: '50%' }} />
        <br />
        
        <label>Upload Profile Picture:</label>
        <input type="file" accept="image/*" onChange={handleImageUpload}  /> <br></br><br />

        <label>Name:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter your name"
        />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        
       
        <label>Email:</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Enter your email"
        />
        <br />
        <br />
        
     
        <PhoneNumber
          phoneNumber={formData.phone}
          updatePhoneNumber={(value) => setFormData({ ...formData, phone: value })}
        />
        <br />
        
     
        <Address updateAddress={updateAddress} />
        <br />
        
      
        <Experience
          experienceEntries={formData.experience}
          updateExperienceEntries={updateExperienceEntries}
        />
        <br />
        
       
        <Education
          educationEntries={formData.education}
          updateEducationEntries={updateEducationEntries}
        />
        <br />
        
     
        <Skills
          skills={formData.skills}
          updateSkills={updateSkills}
        />
        
        <br />
        
        
        <References
          references={formData.references}
          updateReferences={updateReferences}
        />
        <br />
        
     
        <Socials
          socialLinks={formData.socials}
          updateSocialLinks={updateSocialLinks}
        />
        <br />
        
      
        <button type="button" onClick={generatePDF} style={{width:'180px',padding:'10px'}}>
          Print to PDF
        </button>
      </form>
    </div>
  );
}

export default App;
