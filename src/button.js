//props are important for passing values like text in button
import PropTypes from 'prop-types' 

const button = ({text,color,onClick}) => {
    return (
        <button style = {{backgroundColor : color}} className = 'btn' onClick = {onClick}> 
        {text}</button>
    )
}



 button.defaultProps  = {       //will contain what properties it should have on default
     color:'silver'
 }

 button.propTypes = {

    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,

  }
  

export default button
