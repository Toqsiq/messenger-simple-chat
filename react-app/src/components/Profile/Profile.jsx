import { useState } from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';
import ProfileEdit from './ProfileEdit';
import ProfileView from './ProfileView';

function Profile() {

    usePageMeta('Профиль', '👤');


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
                <ProfileEdit
                    name={name}
                    setName={setName}
                    bio={bio}
                    setBio={setBio}
                    handleSave={handleSave}
                />
            ) : (
                <ProfileView
                    name={name}
                    bio={bio}
                    onEdit={() => setIsEditing(true)}
                />
            )}
        </div>
    );
}

export default Profile;
