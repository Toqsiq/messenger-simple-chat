import { useState } from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';

function Profile() {
    usePageMeta('Профиль', '👤')

    const [name, setName] = useState(() => localStorage.getItem('profile-name') || '');
    const [bio, setBio] = useState(() => localStorage.getItem('profile-bio') || '');


    const [isEditing, setIsEditing] = useState(() => {
        return !localStorage.getItem('profile-name');
    });


    const handleSave = () => {
        localStorage.setItem('profile-name', name);
        localStorage.setItem('profile-bio', bio);
        setIsEditing(false);
    };

    return (
        <div className="profile-container">
            <h1>Мой профиль</h1>

            {isEditing ? (

                <div className="profile-form">
                    <label className="profile-label">
                        Имя:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="profile-input"
                        />
                    </label>
                    <label className="profile-label">
                        О себе:
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="profile-textarea"
                            rows="4"
                        />
                    </label>
                    <button onClick={handleSave} className="profile-save-btn">
                        Сохранить
                    </button>
                </div>
            ) : (
                // --- РЕЖИМ ПРОСМОТРА ---
                <div className="profile-card">
                    <h2 className="profile-title">{name || 'Без имени'}</h2>
                    <p className="profile-bio">{bio || 'Пока нет описания...'}</p>
                    <button onClick={() => setIsEditing(true)} className="profile-edit-btn">
                        Редактировать
                    </button>
                </div>
            )}
        </div>
    );
}

export default Profile;
