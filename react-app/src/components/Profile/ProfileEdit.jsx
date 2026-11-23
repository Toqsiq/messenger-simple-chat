function ProfileEdit({ name, setName, bio, setBio, handleSave }) {
    return (
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
    );
}

export default ProfileEdit;
