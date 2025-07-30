import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user session
    const savedUser = localStorage.getItem('buggyBugUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('buggyBugUser');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulate API call - In a real app, this would be an actual authentication service
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simple validation for demo purposes
        if (email && password.length >= 6) {
          const userData = {
            id: Date.now(),
            email,
            name: email.split('@')[0],
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=7c3aed&color=fff`,
            joinDate: new Date().toISOString(),
            notes: [],
            bookmarks: [],
            completedQuizzes: [],
            preferences: {
              emailNotifications: true,
              publicProfile: true,
              theme: 'dark'
            }
          };
          
          setUser(userData);
          localStorage.setItem('buggyBugUser', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('Invalid email or password (password must be at least 6 characters)'));
        }
      }, 1000);
    });
  };

  const register = async (email, password, name) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password.length >= 6 && name) {
          const userData = {
            id: Date.now(),
            email,
            name,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=7c3aed&color=fff`,
            joinDate: new Date().toISOString(),
            notes: [],
            bookmarks: [],
            completedQuizzes: [],
            preferences: {
              emailNotifications: true,
              publicProfile: true,
              theme: 'dark'
            }
          };
          
          setUser(userData);
          localStorage.setItem('buggyBugUser', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('Please fill all fields (password must be at least 6 characters)'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('buggyBugUser');
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('buggyBugUser', JSON.stringify(updatedUser));
  };

  const addNote = (note) => {
    const newNote = {
      id: Date.now(),
      title: note.title,
      content: note.content,
      category: note.category || 'general',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const updatedNotes = [...(user.notes || []), newNote];
    updateUser({ notes: updatedNotes });
    return newNote;
  };

  const updateNote = (noteId, updatedNote) => {
    const updatedNotes = user.notes.map(note => 
      note.id === noteId 
        ? { ...note, ...updatedNote, updatedAt: new Date().toISOString() }
        : note
    );
    updateUser({ notes: updatedNotes });
  };

  const deleteNote = (noteId) => {
    const updatedNotes = user.notes.filter(note => note.id !== noteId);
    updateUser({ notes: updatedNotes });
  };

  const addBookmark = (bookmark) => {
    const newBookmark = {
      id: Date.now(),
      title: bookmark.title,
      url: bookmark.url,
      category: bookmark.category || 'general',
      createdAt: new Date().toISOString()
    };
    
    const updatedBookmarks = [...(user.bookmarks || []), newBookmark];
    updateUser({ bookmarks: updatedBookmarks });
    return newBookmark;
  };

  const removeBookmark = (bookmarkId) => {
    const updatedBookmarks = user.bookmarks.filter(bookmark => bookmark.id !== bookmarkId);
    updateUser({ bookmarks: updatedBookmarks });
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
    addNote,
    updateNote,
    deleteNote,
    addBookmark,
    removeBookmark
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
