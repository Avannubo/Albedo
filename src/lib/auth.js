import axios from "axios";
import { NextResponse } from "next/server";

// auth.js - Create a separate file for authentication-related functions

export const isAuthenticated = () => {
    // Check if the token exists and is valid
    const token = localStorage.getItem('token'); // Get the token from local storage

    // Implement your logic to validate the token
    return !!token; // Return true if the token exists and is valid, false otherwise
};


export async function recaptcha(request, responce) {
    const secretkey = process.env.RECAPTCHA_SECRET_KEY;

    const postData = await request.json();

    const { gRecaptchaToken } = postData;
    let res;

    const formData = `secret=${secretkey}&responce=${gRecaptchaToken}`;

    try {
        res = await axios.post(
            'https://www.google.com/recaptcha/api/siteverify',
            formData,
            {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
    } catch (error) {
        console.error(error);
        responce.status(500).json({ message: 'Error verifying reCAPTCHA' });
        return;
    }
    


    if (res && res.data?.success && res.data?.score >0.5) {
        console.log("res.data?.score: ", res.data?.score);

        return NextResponse.json({ success: true, score: res.data.score });
        


    } else {
        return NextResponse.json({ success: false });
    }
}