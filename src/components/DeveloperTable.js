'use client';
import React from 'react';
import styles from '../styles/DeveloperTable.module.css';
import { Link } from 'react-router-dom';

function DeveloperTable({ contacts, searchQuery, onDelete, onEdit }) {
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.skills.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.github.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.TableContainer}>
      <h2>Developers Table</h2>
      <table className={styles.ContactTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>GitHub Username</th>
            <th>Skills</th>
            <th>Bio</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '1rem' }}>
               <h2>Developer not found.</h2> 
              </td>
            </tr>
          ) : (
            filteredContacts.map((contact, index) => (
              <tr key={index}>
                {/* <td>{contact.name}</td> */}
                <td>
                  <Link to={`/profile/${index}`} className={styles.profileLink} >
                     {contact.name}
                      </Link>
                    </td>

                <td>{contact.github}</td>
                <td>{contact.skills}</td>
                <td>{contact.bio}</td>
                <td>
                  <div className={styles.buttonGroup}>
                    <button
                      className={styles.editButton}
                      onClick={() => onEdit(index)}
                    >
                      Edit
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={() => onDelete(index)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DeveloperTable;
