import { useState } from 'react';
import './App.css';

export default function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('error');
      return;
    }

    setStatus('success');
  };

  return (
    <main className="page">
      <h1 id="form-title">Форма обратной связи</h1>
      <p className="subtitle">Лабораторная работа 11 — CI/CD</p>

      <form id="contact-form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="name-input">Имя</label>
        <input
          id="name-input"
          type="text"
          placeholder="Введите имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email-input">Email</label>
        <input
          id="email-input"
          type="email"
          placeholder="example@mail.ru"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="message-input">Сообщение</label>
        <textarea
          id="message-input"
          placeholder="Ваше сообщение"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button id="submit-btn" type="submit">
          Отправить
        </button>
      </form>

      {status === 'success' && (
        <p id="success-message" className="status success">
          Спасибо! Ваше сообщение отправлено.
        </p>
      )}
      {status === 'error' && (
        <p id="error-message" className="status error">
          Заполните все поля формы.
        </p>
      )}
    </main>
  );
}
