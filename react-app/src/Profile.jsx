import { useState } from 'react';
import { usePageMeta } from './hooks/usePageMeta';

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
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
            <h1>Мой профиль</h1>

            {isEditing ? (

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label>
                        Имя:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        />
                    </label>
                    <label>
                        О себе:
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                            rows="4"
                        />
                    </label>
                    <button
                        onClick={handleSave}
                        style={{ padding: '10px', backgroundColor: '#007AFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                    >
                        Сохранить
                    </button>
                </div>
            ) : (

                <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                    <h2 style={{ marginTop: 0, color: '#333' }}>{name || 'Без имени'}</h2>
                    <p style={{ color: '#666', whiteSpace: 'pre-wrap' }}>{bio || 'Пока нет описания...'}</p>
                    <button
                        onClick={() => setIsEditing(true)}
                        style={{ padding: '8px 16px', backgroundColor: 'transparent', color: '#007AFF', border: '1px solid #007AFF', borderRadius: '5px', cursor: 'pointer' }}
                    >
                        Редактировать
                    </button>
                </div>
            )}
        </div>
    );
}

export default Profile;
