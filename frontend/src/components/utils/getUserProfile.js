import React, { useState} from "react";

export default function getUserProfile() {

    const [username, setUsername] = useState("");
    const [user_id, setUserId] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [date_joined, setDateJoined] = useState("");

    fetch('/api/user_profile')
    .then(response => response.json())
    .then(data => {
        setUserId(data.user_id);
        setUsername(data.username);
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setEmail(data.email);
        setDateJoined(data.date_joined);
    });

    const userProfile = {"user_id": user_id, 
                        "username": username, 
                        "first_name": first_name, 
                        "last_name": last_name, 
                        "email": email, 
                        "date_joined": date_joined};
    
                        console.log(userProfile);

    return userProfile;
}

