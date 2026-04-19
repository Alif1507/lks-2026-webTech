import Navbar from "../components/Navbar"

const Home = () => {
  return (
    <>
    <Navbar />
     <div className="container my-4">
        <figure className="text-center">
          <blockquote className="blockquote">
            <p>E-Health Doctor Scheduling System</p>
          </blockquote>
          <figcaption className="blockquote-footer">
            Welcome <cite title="Source Title">Administrator</cite>
          </figcaption>
        </figure>
      </div> 
    </>
  )
}

export default Home
