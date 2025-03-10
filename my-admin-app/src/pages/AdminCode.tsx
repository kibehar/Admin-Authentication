import React, { useState, useEffect } from 'react';
import { Input, Button, message } from 'antd';

interface AdminCodeProps {
  onSuccess: () => void;
}

const AdminCode: React.FC<AdminCodeProps> = ({ onSuccess }) => {
  const [code, setCode] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isLocked) {
      timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isLocked]);

  const handleSubmit = () => {
    const ADMIN_CODE = '123456';

    if (isLocked) {
      message.error('Please try again after 1 hour.');
      return;
    }

    if (code === ADMIN_CODE) {
      message.success('Admin code verified!');
      onSuccess();
    } else {
      setAttempts(attempts + 1);
      if (attempts >= 2) {
        setIsLocked(true);
        message.error('Please try again after 1 hour.');
      } else {
        message.error('Incorrect admin code. Please try again.');
      }
    }
  };

  return (
    <div className="admin-code-container">
      {!isLocked ? (
        <>
          <Input
            className="dash-input"
            placeholder="Enter Admin Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{ marginBottom: '16px' }}
          />
          <Button type="primary" onClick={handleSubmit} className="submit-button">
            Submit
          </Button>
        </>
      ) : (
        <div className="error-message">
          <p>Please try again after {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}.</p>
        </div>
      )}
    </div>
  );
};

export default AdminCode;