import User from '../../../models/User';
import MyForm from '../../Common/MyForm';
import MySubmitButton from '../../Common/MySubmitButton';
import { signUpUser } from '../../Services/userService';
import { useState } from 'react';
import { Link } from 'react-router-dom';
type Props = {

};
const SignUpForm = (props: Props) => {
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);
    const handleSubmit = async (userToSignUp: User) => {
        const { user, error } = await signUpUser(userToSignUp);
        setError(error);
        setSuccessMessage(user ? true : false);        
    }
    return (
        <MyForm
            title="Sign up"
            errorMessage={error}
            onSubimit={(e, user) => {
                e.preventDefault();
                handleSubmit(user);
            }}
        >
            <MySubmitButton title="Sign up" />
            {
                successMessage ?
                    <p className="text-muted text-center">
                        Your account has been successfully created! Sign in <Link className="text-dark" to="/">here</Link>.
                    </p>
                    : <></>
            }
        </MyForm>
    );
};

export default SignUpForm;