'use client';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import ContactForm from './components/ContactForm';
import DeveloperTable from './components/DeveloperTable';
import styles from './styles/App.module.css';
import Profile from './components/DeveloperProfile';

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const [contacts, setContacts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingContact, setEditingContact] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  //  Load contacts from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('devconnect_contacts');
    if (saved) {
      setContacts(JSON.parse(saved));
    }
  }, []);

  //  Save contacts  to localStorage
  useEffect(() => {
    localStorage.setItem('devconnect_contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = (newContact) => {
    if (editingIndex !== null) {
      const updated = [...contacts];
      updated[editingIndex] = newContact;
      setContacts(updated);
      setEditingIndex(null);
    } else {
      setContacts([...contacts, newContact]);
    }
    setEditingContact(null);
  };

  const handleDeleteContact = (indexToDelete) => {
    setContacts(contacts.filter((_, index) => index !== indexToDelete));
  };

  const handleEditContact = (index) => {
    setEditingContact({ ...contacts[index], index });
    setEditingIndex(index);
    navigate('/');
  };

  return (
    <div className={styles.appContainer}>
      <h1 className={styles.heading}>DevConnect</h1>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className={styles.MainContent}>
                <ContactForm
                  onAddContact={handleAddContact}
                  editingContact={editingContact}
                  setContacts={setContacts}
                  contacts={contacts}
                  setEditingContact={setEditingContact}
                />
              </div>
              <Link to="/contacts" className={styles.viewTableLink}>
                View All Developers
              </Link>
            </>
          }
        />
        <Route
          path="/contacts"
          element={
            <>
              <input
                type="text"
                placeholder="Search by name, skills, or GitHub"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              <DeveloperTable
                contacts={contacts}
                searchQuery={searchQuery}
                onDelete={handleDeleteContact}
                onEdit={handleEditContact}
              />
              <Link to="/" className={styles.viewTableLink}>
                ← Back to Home
              </Link>
            </>
          }
        />
        <Route path="/profile/:id" element={<Profile contacts={contacts} />} />
      </Routes>
    </div>
  );
}

export default App;
