import React from 'react';
import documents from '../../assets/document/documents.png';
import prod from '../../assets/document/prod.png';
import "./noStudyMaterial.css";


function NoStudyMAterial(props) {
  return (<>
    { props.showMsg == false &&
      <div className="up">
      
      <div className="up-container">
        { props.selectedtab == "StudyLibrary"?
        <div>
        <p className="up-text1">No study materials shared yet!</p>
              <img src={documents} alt=""/>
          </div>:
          <div  className="image-div">
          <p className="up-text1">No material available!</p>
                  <img src={prod}  alt=""/>
              </div>
}

      </div>
  </div>
    }

    
</> );
}
export default NoStudyMAterial;