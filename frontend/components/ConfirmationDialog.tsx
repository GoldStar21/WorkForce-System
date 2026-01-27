import Button from "./Button";

type Props = {
  closeDialog: () => void;
  confirm: () => void;
};

const ConfirmationDialog = ({ closeDialog, confirm }: Props) => {
  return (
    <div className="confirmationDialog">
      <div className="confirmationDialog__dialog">
        
        <div className="confirmationDialog__header">
        <h4 className="confirmationDialog__title">ARE YOU SURE</h4>
        </div>
        
        <div className="confirmationDialog__body">
        <p className="confirmationDialog__text">
          By clicking "Yes" you are going to permanently DELETE this assemler!
        </p>
        
        <div className="confirmationDialog__actions">
          <Button
            label="Yes"
            type="button"
            modifier="button--yes"
            onClick={confirm}
          />
          <Button
            label="No"
            type="button"
            modifier="button--no"
            onClick={closeDialog}
          />
        </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
