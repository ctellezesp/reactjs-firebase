import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

firebase.initializeApp({
	apiKey: "AIzaSyAyagGHy2AFCmRfB32THQJfilBnP0MxLCM",
    authDomain: "login-prueba-df90e.firebaseapp.com",
    databaseURL: "https://login-prueba-df90e.firebaseio.com",
    projectId: "login-prueba-df90e",
    storageBucket: "login-prueba-df90e.appspot.com",
    messagingSenderId: "660389541211",
    appId: "1:660389541211:web:51878dbb479054f7"
});


class View extends React.Component{
	constructor(props){
		super(props);
		this.name = '';
		this.lastName = '';
		this.getName = this.getName.bind(this);
		this.getLName = this.getLName.bind(this);
		this.showName = this.showName.bind(this);
		this.handleAuth = this.handleAuth.bind(this);
		this.handleOut = this.handleOut.bind(this);

		this.img = '';
		this.state = {
			user: null
		}
	}

	getName(name){
		this.name = name.target.value;
	}

	getLName(lname){
		this.lname = lname.target.value;
	}

	showName(){
		let id = Math.random().toString(36).substr(2, 9);
		firebase.database().ref('students/' + id).set({
			name: this.name,
			surname: this.lname
		});
		alert('Se agrego correctamente');
	}

	handleAuth(){
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(provider)
		.then(result => {
			console.log(`El usuario se ha logeado`);
		})
		.catch(error => console.log(`Error: ${error.code} ${error.message}`));
	}

	componentWillMount(){
		firebase.auth().onAuthStateChanged(user => {
			this.setState({user});
		});
	}

	handleOut(){
		firebase.auth().signOut()
		.then(result => {
			this.setState({user: null});
		})
	}
	

	render(){
		let imagen = 'https://iberocardio.es/wp-content/uploads/2018/09/avatar-ibero-500x500.png';
		let show = false;
		let name = '';
		if(this.state.user){
			imagen = this.state.user.photoURL;
			show = true;
			name = this.state.user.displayName;
		}
		return(
			<div>
				<div className="row">
					<div className="col s12">
						<a className="waves-effect waves-light btn left blue" onClick={this.handleAuth} disabled={show}><i className="fab fa-google"></i>Login</a>
						<a className="waves-effect waves-light btn right red" onClick={this.handleOut} disabled={!show}><i className="fas fa-sign-out-alt"></i>Logout</a>
						
					</div>
				</div>
				<div id="content" className="row">
					<div className="col s12 l2">
						<img src={imagen} alt="perfil" width="100%"/>
						<h4 className="center-align">Bienvenido {name}</h4>
					</div>
					<div className="col s12 l10">
						<div className="row">
							<h4>Registrar Alumno</h4>
							<div className="input-field col s6">
					          Nombre:
					          <input id="name" type="text" onChange={this.getName}/>
					          
					        </div>
					        <div className="input-field col s6">
					          Apellidos:
					          <input id="lname" type="text" onChange={this.getLName}/>
					        </div>
						</div>
						<a className="waves-effect waves-light btn right" onClick={this.showName}><i className="fas fa-check"></i>Agregar</a>
					</div>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<View />, document.getElementById('root'));

serviceWorker.unregister();
