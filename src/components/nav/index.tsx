import React from "react";
import { Link } from "react-router-dom";
import User from '../../models/User';
import { logOut } from "../Services/userService";

type Props = {
    user: User;
    onLogOut: (user: User) => void;
};
const MyNavBar = (props: Props) => {
    const { user, onLogOut } = props;
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand" href="#">
                    Welcome {user.isAuth && user.userName}
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {
                            user.isAuth
                                ?
                                <React.Fragment>
                                    <li className="nav-item">
                                        <Link
                                            to="/"
                                            onClick={async () => {
                                                const userLogOut = await logOut(user);
                                                if (userLogOut) {
                                                    console.log(userLogOut);
                                                    onLogOut(new User());
                                                }
                                            }}
                                            className="nav-link"
                                        >
                                            Logout
                                        </Link>
                                    </li>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/">SignIn</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/signup">SignUp</Link>
                                    </li>
                                </React.Fragment>
                        }

                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default MyNavBar;