import React, { useState, useRef } from "react";

import "./AutoCompleteSearch.css";

// itemsToSearchIn format example:
// [{title:"زرد" , id:"yellow"},{title:"سبز" , id:"green"},...]
// As you see in above example, itemsToSearchIn is an array of objects not an array of strings and the search is done on title values of these objects
function AutoCompleteSearch({
  itemsToSearchIn,
  selectedItems,
  setSelectedItems,
  placeholder = "search",
}) {
  const [value, setValue] = useState("");

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
  };
  let searchSuggestions;
  if (value)
    searchSuggestions = itemsToSearchIn.filter((item) =>
      item.title.includes(value)
    );
  else searchSuggestions = [];

  const searchSuggestionsElements = searchSuggestions.map((item, index) => (
    <button
      className="suggestion-element"
      key={item.title}
      onClick={() => handleSelectSuggetion(item)}
      data-index={index + 1}
    >
      {item.title}
    </button>
  ));

  const handleRemoveSelectedItem = (event) => {
    // Use the getAttribute method to get the data attribute:
    const itemToRemove = event.target.getAttribute("data-selectedItem");
    const newSelectedItems = selectedItems.filter(
      (item) => item.title !== itemToRemove
    );
    setSelectedItems(newSelectedItems);
  };

  const selectedItemsElements = selectedItems.map((selectedItem) => (
    <div className="selected-item" key={selectedItem.title}>
      <span>{selectedItem.title}</span>
      <button
        className="remove"
        onClick={handleRemoveSelectedItem}
        data-selectedItem={selectedItem.title}
        key={selectedItem.title}
      ></button>
    </div>
  ));

  const handleSelectSuggetion = (newSelectedItem) => {
    setSelectedItems([...selectedItems, newSelectedItem]);
    setValue("");
    inputRef.current.focus();
  };

  ///////////
  const inputRef = useRef();
  const suggestionsRef = useRef();
  ///////
  /* Creating a function called setPointerEnd
     to place the pointer at the end */
  const setPointerEnd = (inputEl) => {
    let len = inputEl.value.length;
    // Mostly for Web Browsers
    if (inputEl.setSelectionRange) {
      inputEl.focus();
      inputEl.setSelectionRange(len, len);
    } else if (inputEl.createTextRange) {
      let t = inputEl.createTextRange();
      t.collapse(true);
      t.moveEnd("character", len);
      t.moveStart("character", len);
      t.select();
    }
  };
  //////////
  const handleKeyDown = (event) => {
    //The unary plus operator ( + ) will convert a string into a number. The operator will go before the operand. We can also use the unary plus operator ( + ) to convert a string into a floating point number. If the string value cannot be converted into a number then the result will be NaN:
    const activeElIndex = +document.activeElement.getAttribute("data-index");

    const elements = [inputRef.current, ...suggestionsRef.current.children];
    if (event.key === "ArrowUp") {
      // * This prevent default is very important and took me a lot of time to figure it out. Without this line, I couldn't set the pointer at the end of the text in input field when focusing on it using arrow up (setPointerEnd function didn't work). It seems there's kind of default behaviour in arrow up key down event that prevent this function to work properly 👇:
      event.preventDefault();
      if (activeElIndex <= 1) {
        setPointerEnd(elements[0]);
      } else {
        elements[activeElIndex - 1].focus();
      }
    }

    if (event.key === "ArrowDown") {
      // I added this prevent default just to prevent page scrolling on arrow key down 👇:
      event.preventDefault();
      if (activeElIndex < elements.length - 1)
        elements[activeElIndex + 1].focus();
    }
  };
  //////

  return (
    <div className="AutoCompleteSearch" onKeyDown={handleKeyDown}>
      <div className="Input">
        {selectedItemsElements}
        <input
          value={value}
          type="text"
          onChange={handleInputChange}
          placeholder={placeholder}
          ref={inputRef}
          data-index={0}
        />
      </div>
      <div className="Suggestions" ref={suggestionsRef}>
        {searchSuggestionsElements}
      </div>
    </div>
  );
}
export default AutoCompleteSearch;
