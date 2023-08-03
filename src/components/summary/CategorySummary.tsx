import React from "react";
import { categoryIcons } from "../icons/IconsSvg";
import { CategorySummaryProps } from "../../models";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { changeCurrentTable } from "../../redux/SummarySlice";

const CategorySummary: React.FC<CategorySummaryProps> = ({ name, active, archived }) => {
    const dispatch = useAppDispatch();
    const { category: currentCategory, archived: categoryArchivedStatus } = useAppSelector(
        (state) => state.summary.currentTable
    );

    const isActiveCategory = name === currentCategory;

    const getClassName = (itemName: string) => {
        switch (itemName) {
            case "category-text":
            case "active-notes-qty":
                return isActiveCategory && !categoryArchivedStatus
                    ? `${itemName} disabled`
                    : itemName;
            case "archived-notes-qty":
                return isActiveCategory && categoryArchivedStatus
                    ? `${itemName} disabled`
                    : itemName;
            default:
                return itemName;
        }
    };

    const changeCategory = (selectedArchivedStatus: boolean) => {
        if (!isActiveCategory || selectedArchivedStatus !== categoryArchivedStatus) {
            dispatch(
                changeCurrentTable({
                    archived: selectedArchivedStatus,
                    category: name,
                })
            );
        }
    };

    return (
        <div className={`table-row ${isActiveCategory ? "active" : "inactive"}`}>
            <p className="category-name">
                <span className="category-icon">{categoryIcons[name]}</span>
                <span
                    className={getClassName("category-text")}
                    onClick={() => changeCategory(false)}>
                    {name}
                </span>
            </p>
            <p className={getClassName("active-notes-qty")} onClick={() => changeCategory(false)}>
                {active}
            </p>
            <p className={getClassName("archived-notes-qty")} onClick={() => changeCategory(true)}>
                {archived}
            </p>
        </div>
    );
};

export default CategorySummary;
