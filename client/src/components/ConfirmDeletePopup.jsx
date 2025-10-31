import ButtonComponent from "./ButtonComponent";
import ReusableModal from "./ReusableModal";
import SecondaryButton from "./SecondaryButton";

export default function ConfirmDeletePopup({ isOpen, onClose, title, message, onConfirm }) {
    if (!isOpen) return null;
    return (
      <ReusableModal
        isOpen={true}
        title={title}>
        <div>
            <p>{message}</p>
        </div>
        <div className="flex justify-end space-x-2 pt-2">
            <ButtonComponent title={'Delete'} onClick={onConfirm}/>
            <SecondaryButton text={'Cancel'} onClick={onClose}/>
        </div>
       </ReusableModal> 
   );   
}