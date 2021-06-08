
import { Menu, MenuItem, MenuSelectEvent } from '@progress/kendo-react-layout';
import { Popup } from '@progress/kendo-react-popup';
import { ContextMenuProps } from '../interfaces/FileManagerModels';

export const ContextMenu = (props: ContextMenuProps) => {
  const handleSelection = (event:  MenuSelectEvent) => {
    props.onContextMenuCLick(event);
  };

  return (
    <Popup show={true} offset={props.offset}>
      <Menu vertical={true} style={{ display: 'inline-block' }} onSelect={handleSelection}>
        <MenuItem text="Rename" icon={'k-icon k-i-edit'} />
        <MenuItem text="Delete" icon={'k-icon k-i-delete'} />
      </Menu>
    </Popup>
  );
}
