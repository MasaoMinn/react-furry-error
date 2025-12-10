import React from 'react';
import type { DevOverlayMessage } from './types';
import { images } from './images';

interface ErrorOverlayProps {
  error: DevOverlayMessage;
}

const ErrorOverlay: React.FC<ErrorOverlayProps> = ({ error }) => {
  const handleReload = () => {
    window.location.reload();
  };

  const imgSrc = images[error.type];

  return (
    <div
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.85)',
        color: 'white',
        zIndex: '999999',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'monospace',
      }}
    >
      <div
        style={{
          background: '#e2e2e2ff',
          border: '2px solid #ff3333',
          borderRadius: '12px',
          padding: '32px',
          maxWidth: '90vw',
          width: '90%',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img src={imgSrc} style={{ width: '40vw' }} alt="Error" />
        </div>

        <div
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#ff3333',
            marginBottom: '16px',
            textAlign: 'center',
          }}
        >
          {error.message}
        </div>

        {error.filename && (
          <div
            style={{
              background: '#c7c2c2ff',
              padding: '12px',
              borderRadius: '6px',
              marginBottom: '16px',
            }}
          >
            文件: <strong>{error.filename}</strong>:{error.line}:{error.column}
          </div>
        )}

        {error.stack && (
          <pre
            style={{
              whiteSpace: 'pre-wrap',
              background: '#ff8b8bff',
              padding: '16px',
              borderRadius: '6px',
              borderLeft: '4px solid #ff3333',
              margin: '16px 0',
              maxHeight: '300px',
              overflow: 'auto',
            }}
          >
            {error.stack}
          </pre>
        )}

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <button
            onClick={handleReload}
            style={{
              background: '#ff3333',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: 'bold',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'background 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#cc0000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#ff3333';
            }}
          >
            重新加载
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorOverlay;