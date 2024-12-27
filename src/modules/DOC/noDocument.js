import React from 'react';
import documents from '../../assets/document/documents.png';
import "./noDocument.css";


function noDocument() {
  return (
      <div className="up">
        
        <div className="up-container">
         <div>
         <p className="up-text1">No documents are available yet!</p>
         
                <img src={documents} alt=""/>
            </div>
        </div>
    </div>
    
  );
}
export default noDocument;