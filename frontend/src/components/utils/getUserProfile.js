import React, { useState} from "react";

export default function getUserProfile() {

    const [userProfile, setUserProfile] = useState("");
    
    fetch('/api/user_profile')
    .then(response => response.json())
    .then(data => {
        setUserProfile(data.username);
    });

    return userProfile;
}

