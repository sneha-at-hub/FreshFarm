// ConfirmationDialog.js

import React from 'react';

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.dialog}>
        <p style={styles.message}>{message}</p>
        <div style={styles.buttonContainer}>
          <button style={styles.confirmButton} onClick={onConfirm}>Yes</button>
          <button style={styles.cancelButton} onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;

// Styles
const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    padding: '20px',
    width: '300px',
    textAlign: 'center',
  },
  message: {
    marginBottom: '20px',
    fontSize: '16px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  confirmButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    margin: '0 10px',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
    color: '#fff',
    transition: 'background-color 0.3s',
  },
  cancelButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    margin: '0 10px',
    cursor: 'pointer',
    backgroundColor: '#f44336',
    color: '#fff',
    transition: 'background-color 0.3s',
  },
};
