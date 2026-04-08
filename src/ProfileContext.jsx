import React, { createContext, useState, useContext } from 'react';
import initialData from './mockData.json';

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(initialData);

  const updatePersonalInfo = (info) => {
    setProfileData(prev => ({
      ...prev,
      personal: { ...prev.personal, ...info }
    }));
  };

  const updateImage = (imageUrl) => {
    setProfileData(prev => ({
      ...prev,
      personal: { ...prev.personal, image: imageUrl }
    }));
  };

  const addPublication = (publication) => {
    setProfileData(prev => ({
      ...prev,
      publicationsInfo: [publication, ...prev.publicationsInfo]
    }));
  };

  return (
    <ProfileContext.Provider value={{
      profileData,
      updatePersonalInfo,
      updateImage,
      addPublication
    }}>
      {children}
    </ProfileContext.Provider>
  );
};
