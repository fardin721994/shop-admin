import React from "react";
import "./Categories.css";
import AutoCompleteSearch from "./AutoCompleteSearch";
const categortyOptions = [
  { title: "زنانه", id: "women" },
  { title: "تاپ", id: "top" },
  { title: "کراپ", id: "crop" },
  { title: "شال و روسری", id: "scarf" },
  { title: "شلوار", id: "pant" },
];
function Categories({ categories, setCategories }) {
  return (
    <div className="Categories">
      <label htmlFor="title">دسته بندی ها</label>
      <AutoCompleteSearch
        itemsToSearchIn={categortyOptions}
        selectedItems={categories}
        setSelectedItems={setCategories}
        placeholder="دسته بندی ها"
      />
    </div>
  );
}

export default Categories;
