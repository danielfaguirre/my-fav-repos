type Props = {
    title: string;
};
export const MySubmitButton = (props: Props) => {
    const {
        title
    } = props;
    return (
        <div>
            <div className="mb-3">
                <button
                    type="submit"
                    className="btn btn-dark w-100">
                    {title}
                </button>
            </div>
        </div>
    );
};

export default MySubmitButton;