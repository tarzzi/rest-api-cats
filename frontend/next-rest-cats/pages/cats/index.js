import Link from "next/link";
import Card from "../../components/Card";

export async function getStaticProps(params) {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const cats = await res.json();

  return {
    props: {
      cats
    } // will be passed to the page component as props
  };
}

export default function Cats({ cats }) {
  const allCats = cats.map((cat) => (
        <Link href={`/${encodeURIComponent(cat.id)}`}>
            <Card {...cat} />
        </Link>
  ))

  return (
    <main>
      <Link href="/">Go back </Link>

      <h1>All cats</h1>
      <div className="grid">{cats.map((cat) => (
          <Link href={`/cats/${cat.id}`} key={cat.id}>
            <div className='card'>
              <h3>{cat.name}</h3>
            </div>
          </Link>
      ))}</div>


      <style jsx>{`
        * {
        list-style-type: none;
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
        
          .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }
        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }
        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }
        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }
      `}</style>
    </main>
  );
}
