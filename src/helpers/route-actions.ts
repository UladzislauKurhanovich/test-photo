import axios from 'axios';
import { ActionFunctionArgs, redirect } from 'react-router-dom';
import { sessionAuthDataHandler } from './sessionAuthDataHandler';

export const loginAction = async ({ request }: ActionFunctionArgs) => {
    let formData = await request.formData();
    let email = formData.get('email') as string | null;
    let password = formData.get('password') as string | null;

    // Validate our form inputs and return validation errors via useActionData()
    if (!email || !password) {
        return {
            error: "You must provide a email and password to log in",
        };
    }

    // Sign in and redirect to the proper destination if successful.
    try {
        const response = await axios.post('http://localhost:3001/auth/login', { email, password })
        //get token from response
        const token = response.data.access_token;

        //set JWT token to local
        // localStorage.setItem('token', token);
        //set JWT token to session
        sessionAuthDataHandler.storeTokens({ jwtToken: token, refreshToken: token });
        //set token to axios common header
        // setTokenHeader(token);
    } catch (error) {
        // Unused as of now but this is how you would handle invalid
        // username/password combinations - just like validating the inputs
        // above
        return {
            error: 'Invalid login attempt',
        };
    }

    return redirect('/photos');
};
