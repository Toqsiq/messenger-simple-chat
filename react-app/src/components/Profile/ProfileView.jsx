function ProfileView({ name, bio, onEdit }) {
    return (
        <div className="profile-card">
            <h2 className="profile-title">{name || 'Без имени'}</h2>
            <p className="profile-bio">{bio || 'Пока нет описания...'}</p>
            <button onClick={onEdit} className="profile-edit-btn">
                Редактировать
            </button>
        </div>
    );
}

export default ProfileView;
