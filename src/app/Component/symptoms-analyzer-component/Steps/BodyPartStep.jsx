import { useState } from "react";
import SelectedButton from "../SelectButton/SelectedButton";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import { bodyParts } from "@/app/utils/iterableVariable";

const BodyPartStep = ({ value, onChange }) => {

    const [isOpen, setIsOpen] = useState(false);


    return (
        <div className="space-y-3">
            <div className="relative">
                {/* Selected Value / Trigger */}
                <SelectedButton setIsOpen={setIsOpen} isOpen={isOpen} value={value} selecType="body part"/>

                {/* Dropdown Menu */}
                {isOpen && <DropDownMenu iterable={bodyParts} value={value} onChange={onChange} setIsOpen={setIsOpen} />}

            </div>
        </div>
    );
};

export default BodyPartStep