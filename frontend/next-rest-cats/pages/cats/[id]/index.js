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
					<h1>Cat {cat.id} / of all cats</h1>
				</div>
				<div className='card'>
					<div className='left'>
						<h2>Name: {cat.name}</h2>
						<p>Age: {cat.age}</p>
						<p>Favorite food: {cat.favfood}</p>
						<p>Bio: {cat.bio}</p>
					</div>
					<div className='image'>
						<Image src={cat.imgsrc} width={300} height={300} />
					</div>
				</div>
				<div className='footer'>
					<Link href="/cats">
						<h3 className='backbtn'>↩ All cats </h3>
					</Link>
				</div>
				<style jsx>{`
        * {
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          box-sizing: border-box;
        }
        body{
        	background-color:#f5fcff;
        }
        .backbtn{
        cursor: pointer;
        }
        .backbtn:hover,.backbtn:active{
        	text-decoration: underline;
        }
        .banner{
        margin-bottom: 6rem;
        }
        h1{        
        	text-align: center;
        	padding-top: 2rem;
        }
        .left{
        text-align: left;
        width: 60%;
        }
        p {
          margin: 0;
        }
        h2 {
          margin: 0;
        }
        .footer{
        margin-top: 5rem;
        text-align: center;
        }
        a {
          list-style-type: none;
          text-decoration: none;
          color: black;
        }
        a:-webkit-any-link {
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
        right: -2px;
        top: -1px;
        }
				.card {
					background-color: white;
					box-shadow: 0px 5px 38px 3px rgba(0,0,0,0.42);
					-webkit-box-shadow: 0px 5px 38px 3px rgba(0,0,0,0.42);
					-moz-box-shadow: 0px 5px 38px 3px rgba(0,0,0,0.42);
        	position: relative;
        	width: 55%;
        	height: 300px;
          margin: 0 auto;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px 0 0 10px;
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
				<style jsx global>{`
        html,
        body {
        	background-color:rgba(242, 242, 242, 0.1);
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
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
      `}</style>
			</div>
	)

}

export default CatInfo