import { Link } from 'react-router-dom'
const CommonProduct = () => {
  return (
    <div className="container">
      <div className="CommonProduct">
        <div className="DivideDiv">
          <div className="firstProduct">
            <Link to="/product/623196a8dd517210fb8f07f5">
              <button className="btn btn-primary"> VISTING CARD</button>
            </Link>{' '}
          </div>
          <div className="SecondProduct">
            <Link to="/product/62319732a2d0fe1f1795c016">
              <button className="btn btn-primary"> Flyers</button>
            </Link>{' '}
          </div>
        </div>
        <div className="DivideDiv3">
          <div className="firstProduct">
            <Link to="/product/6231981ea2d0fe1f1795c01e">
              <button className="btn btn-primary"> Logo</button>
            </Link>{' '}
          </div>
          <div className="SecondProduct">
            <Link to="/product/623b5e73a84af0d7130a5bd4">
              <button className="btn btn-primary">Thumbnails</button>
            </Link>{' '}
          </div>
          <div className="ThirdProduct">
            <Link to="/product/62319732a2d0fe1f1795c016">
              <button className="btn btn-primary"> Flyers</button>
            </Link>{' '}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommonProduct
