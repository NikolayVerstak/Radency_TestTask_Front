import React from "react";
import ActionIcon from "./ActionIcon";
import { useIconAction } from "../../hooks/useIconAction";

interface NoteIconsBlockProps {
    amount: "single note" | "all notes";
}

const NoteIconsBlock: React.FC<NoteIconsBlockProps> = ({ amount }) => {
    const { actionList } = useIconAction({ amount });

    return (
        <p className={`action-icons ${amount}`}>
            {actionList.map((action, index) => {
                return <ActionIcon amount={amount} action={action} key={index} />;
            })}
        </p>
    );
};

export default NoteIconsBlock;
