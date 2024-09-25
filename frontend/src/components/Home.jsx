// import React from "react";

// export default function Home() {
//     return (
//         <div>MESS REBATE AND TOKEN SYSTEM</div>
//     )
// }

import React from "react";
import { Container, Typography, Button, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
    return (
        <div className="home-container">
            <header className="header">
                <Typography variant="h3" component="h1" gutterBottom>
                    Mess Rebate and Token System
                </Typography>
            </header>
            <main className="main-content">
                <Container>
                    <Grid container spacing={4} justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} className="intro-paper">
                                <Typography variant="h5" component="h2" gutterBottom>
                                    Welcome to the Mess Rebate and Token System!
                                </Typography>
                                <Typography variant="body1">
                                    Our system is designed to help you manage and track mess rebates and tokens effectively.
                                    You can view your current balance, check rebate history, and redeem tokens through the 
                                    various sections provided.
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} justifyContent="center" className="action-buttons">
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                component={Link}
                                to="/rebates"
                            >
                                View Rebates
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="secondary"
                                component={Link}
                                to="/tokens"
                            >
                                Manage Tokens
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="outlined"
                                color="info"
                                component={Link}
                                to="/history"
                            >
                                Rebate History
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </main>
            <footer className="footer">
                <Typography variant="body2">
                    &copy; 2024 Mess Rebate and Token System. All rights reserved.
                </Typography>
            </footer>
        </div>
    );
}
