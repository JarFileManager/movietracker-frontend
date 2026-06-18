function HomePage(){
    const username = localStorage.getItem("username");
    if (!username) {
        return (<p>Please log in to view this page.</p>);
    }
    return (
        <>
            <h1>Home Page</h1>
            <h2>Welcome, {username.toUpperCase()}!</h2>
        </>
    );

}

export default HomePage;