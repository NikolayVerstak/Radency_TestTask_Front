import React, { useEffect } from "react";
import CategorySummary from "./CategorySummary";
import { updateSummary } from "../../redux/SummarySlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";

const SummaryTable: React.FC = () => {
    const dispatch = useAppDispatch();
    const { list: notes, qty: notesQty } = useAppSelector((state) => state.notes);
    const { categories } = useAppSelector((state) => state.summary);

    useEffect(() => {
        dispatch(updateSummary(notes));
    }, [notesQty, notes, dispatch]);

    return (
        <div className="summary-table-wrapper">
            <article>
                <header id="summaryHeader">
                    <h1>
                        <p className="first-column">Note Category</p>
                        <p>Active</p>
                        <p>Archived</p>
                    </h1>
                </header>
                <section id="summaryTableBody">
                    {categories.map(({ name, ...categoryProps }) => (
                        <CategorySummary name={name} key={name} {...categoryProps} />
                    ))}
                </section>
            </article>
        </div>
    );
};

export default SummaryTable;
