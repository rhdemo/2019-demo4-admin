import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo, faSave } from "@fortawesome/free-solid-svg-icons";

import "./SavingEditField.scss";

function SavingEditField({type, value, onSave}) {
  const [editMode, setEditMode] = useState(false);
  const [editValue, setEditValue] = useState(value);

  function onEditClick() {
    setEditValue(value);
    setEditMode(true);
  }

  function onCancelClick() {
    setEditMode(false);
  }

  function onSaveClick() {
    if (onSave) {
      onSave(editValue);
    } else {
      console.error("Saving Edit Field has no onSave function");
    }
    setEditMode(false);
  }

  if (editMode) {
    return (
      <div className="field saving-edit-field">
        <input
          className="input editable"
          type={type}
          value={editValue}
          onChange={e => setEditValue(e.target.value)}
        />
        <button
          className="button"
          type="button"
          onClick={onCancelClick}>
          <FontAwesomeIcon icon={faUndo}/>
        </button>
        <button
          className="button is-info"
          type="button"
          onClick={onSaveClick}>
          <FontAwesomeIcon icon={faSave}/>
        </button>
      </div>
    );
  }

  return (
    <div className="field saving-edit-field">
      <input
        className="input uneditable"
        type={type}
        value={value}
        onClick={onEditClick}
        readOnly
      />
    </div>);
}

export default SavingEditField;
