import loader from '../../src/assets/loader/loader.gif'

function Loader() {
  return (
    <>
      <div className='loader_container'>
        <div className='loader'>
          <center>
          
            <img src={loader} />
          </center>
        </div>
      </div>
    </>
  )
}
export default Loader
