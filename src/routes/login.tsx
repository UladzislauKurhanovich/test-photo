import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { Form, useActionData, useNavigation } from 'react-router-dom';

export const Login = () => {
    const navigation = useNavigation();
    const actionData = useActionData() as { error: string } | undefined;

    const isLoggingIn = !!navigation.formData?.get('email') != null && !!navigation.formData?.get('password');

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{  
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Log in
                </Typography>
                <Form method="post" replace style={{ marginTop: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    {actionData && actionData.error ? (
                        <p style={{ color: "red" }}>{actionData.error}</p>
                    ) : null}
                    <Button
                        type="submit"
                        disabled={isLoggingIn}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                    {isLoggingIn ? 'Logging in...' : 'Log in'}
                    </Button>
                </Form>
            </Box>
        </Container>
    );
}