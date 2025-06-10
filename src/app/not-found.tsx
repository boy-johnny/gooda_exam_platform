import Link from "next/link";
import "./not-found.css";
export default function NotFound() {
  return (
    <>
      <div className="site">
        <div className="sketch">
          <div className="bee-sketch red"></div>
          <div className="bee-sketch blue"></div>
        </div>

        <h1>
          404:
          <small>Page Not Found</small>
          <Link href="/">Go to Home</Link>
        </h1>
      </div>
    </>
  );
}
