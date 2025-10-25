import css from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage = ({
  message = "Something went wrong",
}: ErrorMessageProps) => {
  return (
    <div className={css.container}>
      <p className={css.text}>{message}</p>
    </div>
  );
};

export default ErrorMessage;
