import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../styles/Profile.module.css';

function Profile({ contacts }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const contact = contacts[id];

  if (!contact) {
    return (
      <div className={styles.profileContainer}>
        <h2 className={styles.profileHeading}>Developer not found</h2>
        

        <button onClick={() => navigate('/')} className={styles.backButton}>
          ← Go back
        </button>
      </div>
    );
  }

  return (
    <div className={styles.profileContainer}>
      <h2 className={styles.profileHeading}>{contact.name}</h2>
      <div className={styles.profileContent}>
  {contact.image && (
    <img
      src={contact.image}
      alt={`${contact.name}'s profile`}
      className={styles.profileImage}
    />
  )}

  <div className={styles.profileInfo}>
    <p><span className={styles.profileLabel}>GitHub:</span> {contact.github}</p>
    <p><span className={styles.profileLabel}>Skills:</span> {contact.skills}</p>
    <p><span className={styles.profileLabel}>Bio:</span> {contact.bio}</p>

    <button onClick={() => navigate('/')} className={styles.backButton}>
          ← Back to Developers
        </button>
  </div>
</div>

        
      </div>
  );
}

export default Profile;
