////////////////////////////////////EXPERIMNTAL FUNCTIONS///////////////////
//easy way to make multiple elements at the same time with the same or different eventsListeners, attributes, and textContent
const addElements = (DOMObj) => { 
    let allElements, properties,
        propertyValue1, propertyValue2, createdElements = [];   
    let elementQuantity = 0; 
    let elementsWithFunctions = [];
    
    for(let key in DOMObj){        
        switch(key){
            case 'element': allElements = DOMObj['element'].replace(/\s/g,'').split(',');
                break;
            case 'property': properties = DOMObj['property'].replace(/\s/g,'').split(',');
                break;
            case 'propertyValue1': propertyValue1 = DOMObj['propertyValue1'].replace(/\s/g,'').split(',');
                break;
            case 'propertyValue2': propertyValue2 = DOMObj['propertyValue2'].replace(/\s/g,'').split(',');
                break;
        }
    }    
    //if elements entered is more than one then set quatity to the length of the allElements array
    // else if 'numberOfElements' is greater than Zero then add the 'element' entered to 'allElements' by how many times it was specified in 'numberOfElements'
    // else just set 'elementQuatity' to 1
    if (allElements.length > 1) { 
        elementQuantity = allElements.length;
    } else if ( DOMObj['numberOfElements'] > 0 ) {
        elementQuantity = DOMObj['numberOfElements'];        
        for(let i=0; i < elementQuantity; i++){ allElements.push(allElements[0]); }
    }else{ elementQuantity = 1; }

    //Creating Elemnts and adding attributes, textContent
    for(let elementIndex = 0; elementIndex < elementQuantity; elementIndex++){ 
        //creating element
        let create = document.createElement(allElements[elementIndex]); 
        createdElements.push(create);
        //text content of all elements
        if(DOMObj.textContent){ 
            DOMObj.textContent.length > 1 ? create.textContent = DOMObj.textContent[elementIndex] : create.textContent = DOMObj.textContent[0];        
        }
        //adding innet html to the element
        if(DOMObj.innerHtml){
            //if more than one innerHTML is wanted in the same parent
            if(DOMObj.multipleInnerHtml){
                for(let inner of DOMObj.innerHtml)  create.innerHTML += inner;
            }else{
                DOMObj.innerHtml.length > 1 ? create.innerHTML = DOMObj.innerHtml[elementIndex] : create.innerHTML = DOMObj.innerHtml[0];
            }
        }
   
        if(DOMObj.property, DOMObj.propertyValue1 && DOMObj.propertyValue2){
            //applaying the property to the correct element
            if(properties.length && propertyValue1.length && propertyValue2.length){
                switch(true){
                    case properties.length > 1 && propertyValue1.length > 1 && propertyValue2.length > 1:
                        create[properties[elementIndex]](propertyValue1[elementIndex], propertyValue2[elementIndex]);
                        break;
                    case propertyValue1.length <= 1 && propertyValue2.length > 1:
                        create[properties[0]](propertyValue1[0], propertyValue2[elementIndex]);
                        break;
                    case propertyValue1.length > 1 && propertyValue2.length <= 1:
                        create[properties[0]](propertyValue1[elementIndex], propertyValue2[0]);
                        break;
                    default:
                        create[properties[0]](propertyValue1[0], propertyValue2[0]);
                        break;
                }
            }
        }
        // appeding element to parent element
        DOMObj.parentElement.length > 1 ? DOMObj.parentElement[elementIndex].appendChild(create) : DOMObj.parentElement[0].appendChild(create);
        
        //if 'elementWithFunction' exist them add the elements from 'elementWithFunction' to 'elementsWithFunctions'
        //if 'elementWithFunction' dosent exist then add all the elements to the array
        DOMObj.elementWithFunction ? elementsWithFunctions = DOMObj.elementWithFunction : elementsWithFunctions.push(elementIndex);
        // if the index of the element created is equal to 'elementsWithFunctions' then add that funtion to that element
        if(DOMObj.eventFunction){
           for(let i = 0; i < createdElements.length; i++){
              for(let j = 0; j < elementsWithFunctions.length; j++){
                if(i === elementsWithFunctions[j]){
                    createdElements[i].addEventListener(DOMObj.event[j], DOMObj.eventFunction[j]);
                }
              }
            }
        }
    }                       
}