import '../CommonPage/Commonpage.scss';

export default function Register() {
	return (
		<div className="form-container sign-up">
			<form>
				<h1>Create Account</h1>
				<div className="social-icons">
					<a href="#" className="icon">
						<i className="fa-brands fa-google-plus-g" />
					</a>
					<a href="#" className="icon">
						<i className="fa-brands fa-facebook-f" />
					</a>
					<a href="#" className="icon">
						<i className="fa-brands fa-github" />
					</a>
					<a href="#" className="icon">
						<i className="fa-brands fa-linkedin-in" />
					</a>
				</div>
				<span>or use your email for registeration</span>
				<input type="text" placeholder="Username" />
				<input type="email" placeholder="Email" />
				<input type="password" placeholder="Password" />
				<button>Sign Up</button>
			</form>
		</div>
	);
}
