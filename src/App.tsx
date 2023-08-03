import React from "react";
import "./styles/App.scss";
import NotesTable from "./components/notes/NotesTable";
import SummaryTable from "./components/summary/SummaryTable";
import Layout from "./components/layout/Layout";

function App() {
    return (
        <Layout>
            <NotesTable />
            <SummaryTable />
        </Layout>
    );
}

export default App;
