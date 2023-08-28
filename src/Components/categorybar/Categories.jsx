  
import { useState } from 'react';
import './_category.scss'
import { useDispatch } from 'react-redux';
import { getPopularVideos, getVideosCategory } from '../../Redux/actions/video.action';

const keywords = [
  "All",
  "React js",
  "Angular js",
  "React Native",
  "use of API",
  "Redux",
  "Music",
  "Algorithm Art",
  "Guitar",
  "Bengali Songs",
  "Coding",
  "Cricket",
  "Football",
  "Real Madrid",
  "Gatsby",
  "Poor Coder",
  "Shwetabh",
];

const Categories = () => {
  const[activeElement,setactiveElement] = useState("All")
const dispatch  = useDispatch()
  function handleClick(value){
    setactiveElement(value)
    if(value==='All'){
       
      dispatch(getPopularVideos());
    }else{
      dispatch(getVideosCategory(value));
    }
   
  }
  return (
    <div className="CategoriesBar">
      {
        keywords.map((value,index)=> <span  key={index} className={activeElement===value?"active":""} onClick={()=> handleClick(value)}>{value}</span> )
      }
    </div>
  )
}

export default Categories
