import { useState } from 'react';
import User from '../../../models/User';
import MyErrorMessage from '../MyErrorMessage/index';

type Props = {
    title: string;
    onSubimit: (event: any, user: User) => void;
    children?: JSX.Element | JSX.Element[];
    errorMessage: string;
};

const MyForm = (props: Props) => {
    const [user, setUser] = useState(new User());

    const {
        title,
        children,
        onSubimit,
        errorMessage
    } = props;

    const handleInputChange = (e: any) => {
        if (e) {
            const { name, value } = e.target;
            let tempUser = { ...user };
            if (name === 'userName') {
                tempUser.userName = value;
            } else if (name === 'password') {
                tempUser.password = value;
            }
            setUser(tempUser);
        }
    }
    return (
        <div className="col-md-4 offset-md-4 col-sm-6 offset-sm-3 p-3 mt-5">
            <h1 className="text-center">{title}</h1>
            <form onSubmit={(e) => onSubimit(e, user)} id="signup-form">
                <div className="mb-3">
                    <input
                        onChange={handleInputChange}
                        type="text"
                        name="userName"
                        className="form-control"
                        placeholder="Username"
                        required />
                </div>
                <div className="mb-3">
                    <input
                        onChange={handleInputChange}
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        required />
                </div>
                {children}
                <MyErrorMessage errorMessage={errorMessage} />
            </form>
        </div>
    );
};

export default MyForm;