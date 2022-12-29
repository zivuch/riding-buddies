import NavLoggedIn from "./NavLoggedIn";

function Messages() {
  return (
    <>
      <NavLoggedIn/>
      <div className="Chat">
        <header className="App-header">
          <iframe src="https://deadsimplechat.com/H55Sd7LLi" width="100%" height="600px"></iframe>
        </header>
      </div>
    </>
  );
}

export default Messages;