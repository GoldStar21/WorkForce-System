import Button from "./Button";

type Props = {
    openEmployeeGroupList: () => void;
};

const GroupListDialog = ({openEmployeeGroupList}: Props) => {

    return (
        <div className="employeeList">
            <h2 className="employeeList__Title">Group list employees</h2>
            
        </div>
    )

}

export default GroupListDialog;