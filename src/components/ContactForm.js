'use client';
import React, { useEffect, useState } from 'react';
import styles from '../styles/ContactForm.module.css';

function ContactForm({ onAddContact, editingContact, setEditingContact }) {
  const [formData, setFormData] = useState({
    name: '',
    github: '',
    skills: '',
    bio: '',
    image: ''
  });

  useEffect(() => {
    if (editingContact) {
      setFormData({
        name: editingContact.name,
        github: editingContact.github,
        skills: editingContact.skills,
        bio: editingContact.bio,
        image: editingContact.image || ''
      });
    }
  }, [editingContact]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result })); // store base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, github, skills, bio } = formData;
    if (!name || !github || !skills || !bio) {
      alert('Please fill in all fields');
      return;
    }

    onAddContact(formData);
    setFormData({ name: '', github: '', skills: '', bio: '', image: '' });
    setEditingContact(null);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className={styles.inputField}
      />
      <input
        name="github"
        placeholder="GitHub Username"
        value={formData.github}
        onChange={handleChange}
        className={styles.inputField}
      />
      <input
        name="skills"
        placeholder="Skills"
        value={formData.skills}
        onChange={handleChange}
        className={styles.inputField}
      />
      <input
        name="bio"
        placeholder="Bio"
        value={formData.bio}
        onChange={handleChange}
        className={styles.inputField}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className={styles.inputField}
      />

      {formData.image && (
        <img
          src={formData.image}
          alt="Preview"
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            marginTop: '10px',
            objectFit: 'cover'
          }}
        />
      )}

      <button type="submit" className={styles.submitButton}>
        {editingContact ? 'Update' : 'Submit'}
      </button>
    </form>
  );
}

export default ContactForm;
