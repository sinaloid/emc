import React from "react";
import Select from "react-select";

/*const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];*/

const MultiSelect = ({options, setData}) => {

  const setList = (e) => {

    console.log(e)
    const tab = e.map((data) => {

      return data.value
    })

    setData(tab)
    
  }

  return <Select isMulti className="basic-multi-select" options={options} onChange={setList} />
   
}

export default MultiSelect;
