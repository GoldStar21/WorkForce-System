"use client";
import { Employee, GroupType } from "@/app/(site)/groups/page";
import Button from "@/components/Button";
import { FaListUl } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa6";

export type GroupProps = {
  groups: GroupType[];
  openEmployeeGroupList: (groupId: number) => void;
  setGroupName: (name: string) => void;
  editGroup: (group: GroupType) => void;
  openDeleteDialog: (id: number) => void;
};

const GroupTable = ({
  groups,
  openEmployeeGroupList,
  setGroupName,
  editGroup,
  openDeleteDialog,
}: GroupProps) => {
  return (
    <div className="groupTable">
      <table className="groupTable__table">
        <thead className="groupTable__thead">
          <tr className="groupTable__tr">
            <th className="groupTable__th">ID</th>
            <th className="groupTable__th">PROJECT</th>
            <th className="groupTable__th">COUNTRY</th>
            <th className="groupTable__th">ADRESS</th>
            <th className="groupTable__th">DATE FROM</th>
            <th className="groupTable__th">DATE TO</th>
            <th className="groupTable__th"></th>
          </tr>
        </thead>

        <tbody className="groupTable__tbody">
          {groups.map((group) => (
            <tr className="groupTable__tr" key={group.id}>
              <td className="groupTable__td">{group.id}</td>
              <td className="groupTable__td">{group.name}</td>
              <td className="groupTable__td">{group.country}</td>
              <td className="groupTable__td">{group.adress}</td>
              <td className="groupTable__td">{group.dateFrom}</td>
              <td className="groupTable__td">{group.dateTo}</td>
              <td className="groupTable__buttons">
                <Button
                  label={<FaListUl />}
                  modifier="button--edit"
                  onClick={() => {
                    openEmployeeGroupList(group.id);
                    setGroupName(group.name);
                  }}
                />
                <Button
                  label="EDIT"
                  modifier="button--edit"
                  onClick={() => editGroup(group)}
                />
                <Button
                  label="DELETE"
                  modifier="button--delete"
                  onClick={() => openDeleteDialog(group.id)}
                />
                <span className="groupTable__circle">
                  <FaCircle className={`groupTable__status ${new Date(group.dateTo) < new Date() ? "groupTable__status--expired" : "groupTable__status--active"}`}/>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GroupTable;
