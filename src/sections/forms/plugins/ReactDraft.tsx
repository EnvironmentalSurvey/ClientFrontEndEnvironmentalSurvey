import { useState } from 'react';

// third-party
import { Editor, EditorState as EditorType } from 'react-draft-wysiwyg';
import { ContentState, EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// ==============================|| EDITOR - DRAFT ||============================== //

export default function ReactDraft() {
  const [editorState, setEditorState] = useState(() => {
    const initialContent = '';
    return EditorState.createWithContent(ContentState.createFromText(initialContent));
  });

  const onEditorStateChange = (editor: EditorType) => {
    setEditorState(editor);
  };
  return (
    <Editor
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={onEditorStateChange}
    />
  );
}
