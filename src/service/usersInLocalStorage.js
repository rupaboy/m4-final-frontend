export const addUserToStorage = (setStoredUsers, newUser) => {
  setStoredUsers(prev => {
    const exists = prev.find(u => u.email === newUser.email);
    const updated = exists ? prev : [...prev, newUser];
    localStorage.setItem('sphereOne-users', JSON.stringify(updated));
    return updated;
  });
};

export const removeUserFromStorage = (setStoredUsers, email) => {
  setStoredUsers(prev => {
    const updated = prev.filter(u => u.email !== email);
    localStorage.setItem('sphereOne-users', JSON.stringify(updated));
    return updated;
  });
};

export const updateUserInStorage = (setStoredUsers, oldEmail, newEmail, newRole) => {
  setStoredUsers(prev => {
    const updated = prev.map(u =>
      u.email === oldEmail ? { ...u, email: newEmail, role: newRole } : u
    );
    localStorage.setItem('sphereOne-users', JSON.stringify(updated));
    return updated;
  });
};
