const PageNotFound = () => {
  return (
    <div
      style={{
        marginTop: "3rem",
        minHeight: "94.9vh",
        maxHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        background: "linear-gradient(to right, #ff9966, #ff5e62)",
      }}
    >
      <h1
        style={{
          fontSize: "6rem",
          color: "#fff",
          fontFamily: "Arial, sans-serif",
          marginBottom: "2rem",
          marginTop: "2rem",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
        }}
      >
        Oops!&nbsp;Page Not Found
      </h1>
      <p
        style={{
          fontSize: "1.5rem",
          color: "#fff",
          fontFamily: "Arial, sans-serif",
          marginBottom: "2rem",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
        }}
      >
        Sorry, the page you are looking for does not exist.
      </p>
      <img
        src="https://media.giphy.com/media/14uQ3cOFteDaU/giphy.gif"
        alt="Page Not Found"
        style={{
          width: "40%",
          borderRadius: "16px",
          boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
        }}
      />
    </div>
  );
};

export default PageNotFound;
