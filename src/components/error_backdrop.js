import './error_backdrop.css'

function ErrorBackdrop(props) {
    return <div className='error_backdrop' onClick={props.onCancel}></div>
  }
  
  export default ErrorBackdrop
  