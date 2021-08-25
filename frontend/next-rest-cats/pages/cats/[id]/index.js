import Link from 'next/link'

export const getStaticPaths = async () => {
	const res = await fetch('https://jsonplaceholder.typicode.com/users');
	const cats = await res.json();

	const paths = cats.map(cat => {
		return {
			params: { id: cat.id.toString() }
		}
	})
	return {
	paths,
	fallback: false
	}
}


export const getStaticProps = async (context) => {
	const id = context.params.id;
	const res = await fetch('https://jsonplaceholder.typicode.com/users/' + id);
	const data = await res.json();

	return {
		props: { cat: data }
	}
}


const Cat = ({cat}) => {

	return(
			<div>
				<Link href='/cats'>Go back</Link>
				<div className='card'>
					<h2>{cat.username}</h2>
					<p>{cat.name}</p>
					<p>{cat.address.city}</p>
				</div>
				<style jsx>{`
        * {
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          box-sizing: border-box;
        }
        p {
          margin: 0;
        }
        h2 {
          margin: 0;
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
        .card {
        	width: 50%;
          margin: auto;
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
			</div>
	)

}

export default Cat