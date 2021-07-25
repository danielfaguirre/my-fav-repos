import MySubmitButton from '../../Common/MySubmitButton';
import MyForm from '../../Common/MyForm/index';
import { Link } from 'react-router-dom';
import User from '../../../models/User';
import { useState } from 'react';
import { signIn } from '../../Services/userService';

type Props = {
    onAuth: (user: User) => void;
};
const SignInForm = (props: Props) => {
    const { onAuth } = props;
    const [error, setError] = useState('');
    const handleSubmit = async (userToSignUp: User) => {
        const { user, error } = await signIn(userToSignUp);
        setError(error);
        if (user)
            onAuth(user);
    }
    return (
        <MyForm
            title="Sign in"
            errorMessage={error}
            onSubimit={(e, user) => {
                e.preventDefault();
                handleSubmit(user);
            }}
        >
            <MySubmitButton title="Sign in" />
            <p className="text-muted text-center">
                If you don't have an account please sign up at first <Link className="text-dark" to="/signup">here</Link>.
            </p>
        </MyForm>
    );
};

export default SignInForm;