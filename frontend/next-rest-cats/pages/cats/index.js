import Link from "next/link";
import Card from "../../components/Card";

export async function getStaticProps(context) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const cats = await res.json();

  if (!cats) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      cats
    } // will be passed to the page component as props
  };
}

export default function Cats({ cats }) {
  const allCats = cats.map((cat) => <Card key={cat.id} {...cat} />);

  return (
    <main>
      <Link href="/">Go back </Link>

      <h1>All cats</h1>
      <div className="grid">{allCats}</div>
      <style jsx>{`
        * {
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          box-sizing: border-box;
        }
        a {
          list-style-type: none;
          text-decoration: none;
          color: black;
        }
        a:visited {
          color: black;
        }
        a:hover {
          text-decoration: underline;
        }

        .grid {
          display: grid;
          grid-template-columns: auto auto auto auto;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          font-size: 1.5rem;
        }
      `}</style>
    </main>
  );
}
