import React, { useState} from "react";

export default function getUserProfile() {

    const [userProfile, setUserProfile] = useState("");

    
    fetch('/api/user_profile')
    .then(response => response.json())
    .then(data => {
        console.log(`GET PROF LOG -- >> ${data.user_id}, ${data.username}`)
        setUserProfile(data.username);
    });

    return userProfile;
}

