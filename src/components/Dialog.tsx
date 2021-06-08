import * as React from 'react';
import { Dialog as DialogComponent, DialogActionsBar, DialogCloseEvent } from '@progress/kendo-react-dialogs';
import { Input, InputChangeEvent } from '@progress/kendo-react-inputs';
import { getName } from '../helpers/helperMethods';

export const EditDialog = (props) => {
  const [inputValue, setInputValue] = React.useState(props.editValue);

  const handleDialogClick = (event) => {
    props.onDialogClick({
      event,
      path: props.editValue.path,
      value: typeof(inputValue) === 'string' ? inputValue : inputValue.path,
      type: event.target.value
    });
  };

  const handleDialogClose = (event: DialogCloseEvent) => {
    props.onDialogClose(event);
  };

  const handleInputChange = (event: InputChangeEvent) => {
    setInputValue(event.value);
  };

  return (
    <DialogComponent title={'Please confirm'} onClose={handleDialogClose}>
      <p style={{ width: '350px', margin: '25px', textAlign: 'center' }}>Enter new name for the file.</p>
      <Input
        maxLength={40}
        value={getName(inputValue.path)}
        style={{ width: '350px', margin: '25px', textAlign: 'center' }}
        className={'k-textbox'}
        onChange={handleInputChange}
        />
      <DialogActionsBar>
        <button value={'rename'} className='k-button k-state-selected' onClick={handleDialogClick}>Rename</button>
        <button value={'cancel'} className='k-button' onClick={handleDialogClick}>Cancel</button>
      </DialogActionsBar>
    </DialogComponent>
  );
}

export const DeleteDialog = (props) => {
  const handleDialogClick = (event) => {
    props.onDialogClick({
      event,
      type: event.target.value
    });
  };

  const handleDialogClose = (event) => {
    props.onDialogClose(event);
  };

  return (
    <DialogComponent title={'Please confirm'} onClose={handleDialogClose}>
      <p style={{ width: '350px', margin: '25px', textAlign: 'center' }}>Are you sure you want to delete the selected file? You cannot undo this action.</p>
      <DialogActionsBar>
        <button value={'delete'} className='k-button k-state-selected' onClick={handleDialogClick}>Delete</button>
        <button value={'cancel'} className='k-button' onClick={handleDialogClick}>Cancel</button>
      </DialogActionsBar>
    </DialogComponent>
  );
}
