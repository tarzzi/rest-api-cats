import Link from 'next/link'
import Image from 'next/image';
export const getStaticPaths = async () => {
	const res = await fetch('http://localhost:8080/cats');
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
	const res = await fetch('http://localhost:8080/cats/' + id);
	const catData = await res.json();

	return {
		props: { catData }
	}
}


const CatInfo = ({ catData }) => {
	const cat = catData[0];
	return(
			<div>
				<div className='banner'>
					<Link href="/cats">All cats</Link>
					<h1>Cat {cat.id} / of all cats</h1>
				</div>
				<div className='card'>
					<div className='left'>
						<h2>Name: {cat.name}</h2>
						<p>Age: {cat.age}</p>
					</div>
					<div className='image'>
						<Image src={cat.imgsrc} width={300} height={300} />
					</div>
				</div>
				<style jsx>{`
        * {
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          box-sizing: border-box;
        }
        h1{        
        	text-align: center;
        }
        .left{
        text-align: left;
        }
        p {
          margin: 0;
        }
        h2 {
          margin: 0;
        }
        h1{
        margin-top: 2rem;
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
        .grid{
        	display: grid;
        	grid-template-columns: auto auto;
        }
        .image{
        position: absolute;
        right: 0;
        top: 0;
        }
        .card {
        	position: relative;
        	width: 50%;
        	height: 300px;
        	padding: 10rem 0 ;
          margin: 0 auto;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
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

export default CatInfo