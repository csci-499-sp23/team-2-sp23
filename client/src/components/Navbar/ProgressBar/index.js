import "./styles.css";

export default function ProgressBar({ loading, finished }) {
  if (!loading) return <></>;

  return (
    <div className={`bar ${finished ? "finished" : "not-finished"}`}></div>
  );
}
