type Props = {
    errorMessage: string;
};

const MyErrorMessage = (props: Props) => {
    const { errorMessage } = props;
    return (
        <p className="text-danger text-center">{errorMessage}</p>
    );
};

export default MyErrorMessage;