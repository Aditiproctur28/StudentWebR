import React from 'react';
import documents from '../../assets/document/documents.png';
import "./noProduct.css";


function NoProduct() {
  return (
      <div className="up">
        
        <div className="up-container">
         <div>
         <p className="up-text1">No Products Available</p>
         
                <img src={documents} alt=""/>
            </div>
        </div>
    </div>
    
  );
}
export default NoProduct;