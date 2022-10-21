import Login from "./components/Login";
function App() {
  return (
    <div className="App" id="App">
      <header style={{fontFamily: 'san-serif',padding: '10px',
      color: 'white',textAlign:'center',
      fontSize: '48px', backgroundColor: '#007AFF'}}>Airport Management System</header>
      <div style={{paddingBottom: '50px'}}></div>
      <Login/>
    </div>
  );
}

export default App;
