// import React, { useRef, useState } from 'react';
// import Editor from '@monaco-editor/react';

// const EditorComponent = ({ socketRef, roomId }) => {
//   const editorRef = useRef();
//   const [value, setValue] = useState('');

//   function handleChange(e) {
//     console.log(e);
//   }

//   const onMount = (editor) => {
//     editorRef.current = editor;
//     editor.focus();

//     socketRef.current.emit('code-change', {
//       roomId,
//       value,
//     });

//     socketRef.current.on('code-change', ({ value }) => {
//       if (value !== null) {
//         editorRef.current.setValue(value);
//       }
//     });
//   };

//   console.log(value);

//   return (
//     <Editor
//       height="90vh"
//       defaultLanguage="javascript"
//       defaultValue="// some comment"
//       theme="vs-dark"
//       onMount={onMount}
//       value={value}
//       onChange={handleChange}
//     />
//   );
// };

// export default EditorComponent;

import React, { useEffect, useRef } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import ACTIONS from '../Actions';

const EditorComponent = ({ socketRef, roomId, onCodeChange }) => {
  const editorRef = useRef(null);
  useEffect(() => {
    async function init() {
      editorRef.current = Codemirror.fromTextArea(
        document.getElementById('realtimeEditor'),
        {
          mode: { name: 'javascript', json: true },
          theme: 'dracula',
          autoCloseTag: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      );

      editorRef.current.on('change', (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code);
        if (origin !== 'setValue') {
          socketRef.current.emit(ACTIONS.CODE__CHANGE, {
            roomId,
            code,
          });
        }
      });
    }
    init();
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE__CHANGE, ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });
    }

    return () => {
      socketRef.current.off(ACTIONS.CODE__CHANGE);
    };
  }, [socketRef.current]);

  return <textarea id="realtimeEditor"></textarea>;
};

export default EditorComponent;
