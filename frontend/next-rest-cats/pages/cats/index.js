import Link from "next/link";
import Image from 'next/image';

export async function getStaticProps(params) {
  const res = await fetch('http://localhost:8080/cats');
  const cats = await res.json();

  return {
    props: {
      cats
    } // will be passed to the page component as props
  };
}

export default function Cats({ cats }) {

  return (
    <div className='wrapper'>
      <div className='banner'>
        <h1>All cats</h1>
      </div>
      <div className="grid">{cats.map((cat) => (
          <Link href={`/cats/${cat.id}`} key={cat.id}>
            <div className='card'>
              <h3>{cat.name}</h3>
              <Image src={cat.imgsrc} width={150} height={150} />
            </div>
          </Link>
      ))}</div>


      <div className='footer'>
        <Link href="/">
          <h3 className='backbtn'>↩ Intro page </h3>
        </Link>
      </div>
      <style jsx>{`
        * {        
        margin: 0;
        list-style-type: none;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          box-sizing: border-box;
        }
         .backbtn{
        cursor: pointer;
        }
        .backbtn:hover,.backbtn:active{
        	text-decoration: underline;
        }
        .footer{
        margin-top: 5rem;
        text-align: center;
        }
        body{
        background-color:#f5fcff;
        }
        h1{
        padding-top: 2rem;
        }
        a {
          list-style-type: none;
          text-decoration: none;
          color: black;
        }
        a:visited {
          color: black !important;
        }
        a:hover {
          text-decoration: underline;
        }
        .banner{
        color: black;
        text-align: center;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(3, auto);
          grid-auto-flow: row;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          font-size: 1.5rem;
        }
        .card {          
          -webkit-box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0); 
          box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
          background-color: white;
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: center;
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
          cursor: pointer;
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
          padding: 0;
        	background-color:rgba(242, 242, 242, 0.1);
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
  );
}
